import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ShoppingCart, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+12.5%",
    changeType: "up" as const,
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    value: "12,234",
    change: "+5.2%",
    changeType: "up" as const,
    icon: Users,
  },
  {
    title: "Products",
    value: "342",
    change: "+2.1%",
    changeType: "up" as const,
    icon: Package,
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    amount: "$125.00",
    status: "delivered",
    date: "2025-01-13",
  },
  {
    id: "ORD-002",
    customer: "Michael Chen",
    amount: "$89.50",
    status: "processing",
    date: "2025-01-13",
  },
  {
    id: "ORD-003",
    customer: "Emma Davis",
    amount: "$210.00",
    status: "shipped",
    date: "2025-01-12",
  },
  {
    id: "ORD-004",
    customer: "James Wilson",
    amount: "$67.25",
    status: "pending",
    date: "2025-01-12",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "delivered":
      return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
    case "processing":
      return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
    case "shipped":
      return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    default:
      return <Badge>Unknown</Badge>
  }
}

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="flex items-center">
                  {stat.changeType === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  {stat.change} from last month
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="flex flex-col space-y-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest orders from your customers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {order.id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer} • {order.date}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <p className="text-sm font-medium">{order.amount}</p>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:w-1/3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Package className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <ShoppingCart className="mr-2 h-4 w-4" />
              View Orders
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Customers
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <AlertTriangle className="mr-2 h-4 w-4" />
              View Alerts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
