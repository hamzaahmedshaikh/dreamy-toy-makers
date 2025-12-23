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
import { Package, Eye, RefreshCw, Lock, ExternalLink } from "lucide-react";

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

const ADMIN_PASSWORD = "skylar2024"; // Simple password protection

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchOrders();
    } else {
      toast({
        title: "Wrong password",
        variant: "destructive",
      });
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error loading orders",
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-8 px-4 flex items-center justify-center">
        <div className="glass-card rounded-3xl p-8 max-w-md w-full text-center">
          <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-handwritten text-3xl text-foreground mb-6">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="rounded-xl text-center"
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
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
          <Button onClick={fetchOrders} disabled={loading} variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
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
              {orders.length === 0 ? (
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