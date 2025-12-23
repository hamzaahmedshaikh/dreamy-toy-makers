-- Create orders table to store all order information
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  message TEXT,
  reference_image_url TEXT,
  transformed_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  amount DECIMAL(10,2) NOT NULL DEFAULT 489.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access (Skylar can see all orders)
-- Since this is a single-user admin, we'll use a simple email check
CREATE POLICY "Admin can view all orders" 
ON public.orders 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can update orders" 
ON public.orders 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_orders_updated_at();

-- Create storage bucket for order images
INSERT INTO storage.buckets (id, name, public)
VALUES ('order-images', 'order-images', true);

-- Storage policies for order images
CREATE POLICY "Anyone can view order images"
ON storage.objects FOR SELECT
USING (bucket_id = 'order-images');

CREATE POLICY "Service role can upload order images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'order-images');