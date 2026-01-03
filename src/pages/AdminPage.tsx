import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Package, Eye, RefreshCw, Lock, LogOut, Loader2 } from "lucide-react";
import type { User, Session } from "@supabase/supabase-js";

interface Order {
  id: string;
  order_number: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  payment_method: string;
  message: string | null;
  reference_image_url: string | null;
  transformed_image_url: string | null;
  status: string;
  notes: string | null;
  amount: number;
  created_at: string;
  updated_at: string;
}

const AdminPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const { toast } = useToast();

  // Check admin role
  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin'
      });
      
      if (error) {
        console.error("Error checking admin role:", error);
        return false;
      }
      
      return data === true;
    } catch (error) {
      console.error("Error checking admin role:", error);
      return false;
    }
  };

  // Set up auth state listener
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer admin check with setTimeout to prevent deadlock
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id).then(isAdminUser => {
              setIsAdmin(isAdminUser);
              setIsCheckingAuth(false);
              if (isAdminUser) {
                fetchOrders();
              }
            });
          }, 0);
        } else {
          setIsAdmin(false);
          setIsCheckingAuth(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkAdminRole(session.user.id).then(isAdminUser => {
          setIsAdmin(isAdminUser);
          setIsCheckingAuth(false);
          if (isAdminUser) {
            fetchOrders();
          }
        });
      } else {
        setIsCheckingAuth(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        const isAdminUser = await checkAdminRole(data.user.id);
        if (!isAdminUser) {
          await supabase.auth.signOut();
          toast({
            title: "Access Denied",
            description: "You don't have admin privileges.",
            variant: "destructive",
          });
          return;
        }
        
        toast({ title: "Welcome back!" });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOrders([]);
    setIsAdmin(false);
    toast({ title: "Logged out" });
  };

  const fetchOrders = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      const errorMessage = error?.message || "Connection failed. Please try again.";
      setFetchError(errorMessage);
      toast({
        title: "Error loading orders",
        description: "Check your connection and try refreshing.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async () => {
    if (!selectedOrder) return;

    try {
      const { error } = await supabase
        .from("orders")
        .update({
          status: editStatus,
          notes: editNotes,
        })
        .eq("id", selectedOrder.id);

      if (error) throw error;

      toast({ title: "Order updated!" });
      setSelectedOrder(null);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
      toast({
        title: "Error updating order",
        variant: "destructive",
      });
    }
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setEditNotes(order.notes || "");
    setEditStatus(order.status);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/20 text-yellow-700";
      case "paid": return "bg-blue-500/20 text-blue-700";
      case "in_progress": return "bg-purple-500/20 text-purple-700";
      case "shipped": return "bg-green-500/20 text-green-700";
      case "completed": return "bg-emerald-500/20 text-emerald-700";
      case "cancelled": return "bg-red-500/20 text-red-700";
      default: return "bg-gray-500/20 text-gray-700";
    }
  };

  // Loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen pt-24 pb-8 px-4 flex items-center justify-center">
        <div className="glass-card rounded-3xl p-8 max-w-md w-full text-center">
          <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Login form
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen pt-24 pb-8 px-4 flex items-center justify-center">
        <div className="glass-card rounded-3xl p-8 max-w-md w-full text-center">
          <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-handwritten text-3xl text-foreground mb-6">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
              className="rounded-xl"
              required
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="rounded-xl"
              required
            />
            <Button type="submit" className="w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
          {user && !isAdmin && (
            <p className="text-sm text-destructive mt-4">
              You're logged in but don't have admin access.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-primary" />
            <h1 className="font-handwritten text-4xl text-foreground">Orders</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            <Button onClick={fetchOrders} disabled={loading} variant="outline" size="sm">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fetchError ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="text-destructive mb-4">{fetchError}</div>
                    <Button onClick={fetchOrders} variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    No orders yet
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">{order.order_number}</TableCell>
                    <TableCell>{order.customer_first_name} {order.customer_last_name}</TableCell>
                    <TableCell className="text-sm">{order.customer_email}</TableCell>
                    <TableCell className="capitalize">{order.payment_method}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openOrderDetails(order)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Order Details Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-handwritten text-2xl">
                Order {selectedOrder?.order_number}
              </DialogTitle>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-medium">{selectedOrder.customer_first_name} {selectedOrder.customer_last_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedOrder.customer_email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment</p>
                    <p className="font-medium capitalize">{selectedOrder.payment_method}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-medium">${selectedOrder.amount}</p>
                  </div>
                </div>

                {selectedOrder.message && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Customer Message</p>
                    <p className="bg-muted/50 p-3 rounded-lg">{selectedOrder.message}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {selectedOrder.reference_image_url && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Reference Image</p>
                      <a href={selectedOrder.reference_image_url} target="_blank" rel="noopener noreferrer">
                        <img 
                          src={selectedOrder.reference_image_url} 
                          alt="Reference" 
                          className="w-full h-40 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                        />
                      </a>
                    </div>
                  )}
                  {selectedOrder.transformed_image_url && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Preview</p>
                      <a href={selectedOrder.transformed_image_url} target="_blank" rel="noopener noreferrer">
                        <img 
                          src={selectedOrder.transformed_image_url} 
                          alt="Preview" 
                          className="w-full h-40 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                        />
                      </a>
                    </div>
                  )}
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Status</p>
                    <Select value={editStatus} onValueChange={setEditStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Notes</p>
                    <Textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Add notes about this order..."
                      rows={3}
                    />
                  </div>

                  <Button onClick={updateOrder} className="w-full">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPage;