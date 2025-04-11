"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { RoleGuard } from "@/components/auth/role-guard";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Edit, Building, CreditCard, Users, Calendar, 
  Mail, Settings, Check, X, Download, Trash2, Save
} from "lucide-react";
import Link from "next/link";

export default function TenantDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for the tenant
  const tenant = {
    id,
    name: "Origin Inc.",
    plan: "Enterprise",
    userCount: 25,
    status: "active",
    billingCycle: "annual",
    nextBilling: "2025-12-15T00:00:00.000Z",
    created: "2024-10-15T00:00:00.000Z",
    contactEmail: "admin@origininc.com",
    contactName: "John Smith",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Tech Blvd, San Francisco, CA 94107",
    features: ["Unlimited Workspaces", "Unlimited AI Agents", "Priority Support", "Custom Integrations"],
    billingHistory: [
      { id: "bill-1", date: "2024-12-15T00:00:00.000Z", amount: "$25,000.00", status: "paid", invoice: "INV-2024-001" },
      { id: "bill-2", date: "2023-12-15T00:00:00.000Z", amount: "$20,000.00", status: "paid", invoice: "INV-2023-001" },
    ],
    users: [
      { id: "user-1", name: "Jane Smith", email: "jane.smith@origininc.com", role: "Platform Admin" },
      { id: "user-2", name: "John Doe", email: "john.doe@origininc.com", role: "Tenant Admin" },
      { id: "user-3", name: "Alex Johnson", email: "alex.johnson@origininc.com", role: "Product Owner" },
      { id: "user-4", name: "Sarah Williams", email: "sarah.williams@origininc.com", role: "Engineer" },
      { id: "user-5", name: "Mike Brown", email: "mike.brown@origininc.com", role: "Engineer" },
    ],
    settings: {
      ssoEnabled: true,
      mfaRequired: true,
      customDomain: "platform.origininc.com",
      sessionTimeout: 60,
      passwordPolicy: "strong",
      apiAccess: true,
    }
  };

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Active</span>;
      case "inactive":
        return <span className="text-xs bg-gray-500/10 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>;
      case "trial":
        return <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Trial</span>;
      case "expired":
        return <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">Expired</span>;
      case "paid":
        return <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Paid</span>;
      case "pending":
        return <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full">Pending</span>;
      case "overdue":
        return <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">Overdue</span>;
      default:
        return <span className="text-xs bg-gray-500/10 text-gray-500 px-2 py-0.5 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/subscriptions")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Tenants
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Building className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{tenant.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                <span>{tenant.plan} Plan ({tenant.billingCycle})</span>
              </div>
              <div>
                {getStatusBadge(tenant.status)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RoleGuard
            allowedRoles={["platform_admin"]}
            fallback={null}
          >
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsEditing(false)}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Tenant
              </Button>
            )}
          </RoleGuard>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tenant.users.length}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Contact
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium truncate">{tenant.contactEmail}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Next Billing
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">{new Date(tenant.nextBilling).toLocaleDateString()}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Settings
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">
                {tenant.settings.ssoEnabled ? "SSO Enabled" : "SSO Disabled"}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Details</CardTitle>
              <CardDescription>
                Basic information about this tenant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Tenant Name</div>
                    {isEditing ? (
                      <Input defaultValue={tenant.name} />
                    ) : (
                      <div>{tenant.name}</div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Subscription Plan</div>
                    {isEditing ? (
                      <select className="w-full p-2 border rounded-md" defaultValue={tenant.plan}>
                        <option value="Starter">Starter</option>
                        <option value="Professional">Professional</option>
                        <option value="Enterprise">Enterprise</option>
                      </select>
                    ) : (
                      <div>{tenant.plan}</div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Contact Name</div>
                    {isEditing ? (
                      <Input defaultValue={tenant.contactName} />
                    ) : (
                      <div>{tenant.contactName}</div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Contact Email</div>
                    {isEditing ? (
                      <Input defaultValue={tenant.contactEmail} />
                    ) : (
                      <div>{tenant.contactEmail}</div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Contact Phone</div>
                    {isEditing ? (
                      <Input defaultValue={tenant.contactPhone} />
                    ) : (
                      <div>{tenant.contactPhone}</div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Billing Cycle</div>
                    {isEditing ? (
                      <select className="w-full p-2 border rounded-md" defaultValue={tenant.billingCycle}>
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual</option>
                      </select>
                    ) : (
                      <div className="capitalize">{tenant.billingCycle}</div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Address</div>
                    {isEditing ? (
                      <Input defaultValue={tenant.address} />
                    ) : (
                      <div>{tenant.address}</div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Status</div>
                    {isEditing ? (
                      <select className="w-full p-2 border rounded-md" defaultValue={tenant.status}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="trial">Trial</option>
                      </select>
                    ) : (
                      <div>{getStatusBadge(tenant.status)}</div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Included Features</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tenant.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="flex items-center"
                      >
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                Past invoices and payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Date</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Invoice</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Amount</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Status</th>
                      <th className="px-4 py-3.5 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {tenant.billingHistory.map((bill, index) => (
                      <motion.tr
                        key={bill.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <td className="px-4 py-4 text-sm">
                          {new Date(bill.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium">
                          {bill.invoice}
                        </td>
                        <td className="px-4 py-4 text-sm">{bill.amount}</td>
                        <td className="px-4 py-4 text-sm">{getStatusBadge(bill.status)}</td>
                        <td className="px-4 py-4 text-sm text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">Next Billing</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(tenant.nextBilling).toLocaleDateString()} - {tenant.plan} Plan ({tenant.billingCycle})
                    </p>
                  </div>
                  <Button variant="outline">Update Payment Method</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Users</CardTitle>
              <CardDescription>
                Users associated with this tenant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Name</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Email</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Role</th>
                      <th className="px-4 py-3.5 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {tenant.users.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <td className="px-4 py-4 text-sm">
                          <Link href={`/dashboard/users/${user.id}`} className="font-medium hover:underline">
                            {user.name}
                          </Link>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{user.email}</td>
                        <td className="px-4 py-4 text-sm">{user.role}</td>
                        <td className="px-4 py-4 text-sm text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Invite Users
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Settings</CardTitle>
              <CardDescription>
                Configure tenant-specific settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">Single Sign-On (SSO)</h3>
                    <p className="text-sm text-muted-foreground">
                      Enable SSO authentication for this tenant
                    </p>
                  </div>
                  <div className="flex items-center">
                    {isEditing ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={tenant.settings.ssoEnabled} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    ) : (
                      tenant.settings.ssoEnabled ? (
                        <span className="inline-flex items-center text-green-500">
                          <Check className="h-4 w-4 mr-1" />
                          Enabled
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-red-500">
                          <X className="h-4 w-4 mr-1" />
                          Disabled
                        </span>
                      )
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">Multi-Factor Authentication (MFA)</h3>
                    <p className="text-sm text-muted-foreground">
                      Require MFA for all users in this tenant
                    </p>
                  </div>
                  <div className="flex items-center">
                    {isEditing ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={tenant.settings.mfaRequired} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    ) : (
                      tenant.settings.mfaRequired ? (
                        <span className="inline-flex items-center text-green-500">
                          <Check className="h-4 w-4 mr-1" />
                          Required
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-red-500">
                          <X className="h-4 w-4 mr-1" />
                          Optional
                        </span>
                      )
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">Custom Domain</h3>
                    <p className="text-sm text-muted-foreground">
                      {tenant.settings.customDomain || "No custom domain configured"}
                    </p>
                  </div>
                  {isEditing ? (
                    <Input defaultValue={tenant.settings.customDomain} className="max-w-xs" />
                  ) : (
                    <Button variant="outline">Configure</Button>
                  )}
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">Session Timeout</h3>
                    <p className="text-sm text-muted-foreground">
                      {tenant.settings.sessionTimeout} minutes
                    </p>
                  </div>
                  {isEditing ? (
                    <Input type="number" defaultValue={tenant.settings.sessionTimeout} className="max-w-xs" />
                  ) : (
                    <Button variant="outline">Change</Button>
                  )}
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">Password Policy</h3>
                    <p className="text-sm text-muted-foreground">
                      {tenant.settings.passwordPolicy === "strong" ? "Strong (12+ chars, special chars required)" : "Standard (8+ chars)"}
                    </p>
                  </div>
                  {isEditing ? (
                    <select className="p-2 border rounded-md" defaultValue={tenant.settings.passwordPolicy}>
                      <option value="standard">Standard</option>
                      <option value="strong">Strong</option>
                    </select>
                  ) : (
                    <Button variant="outline">Configure</Button>
                  )}
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">API Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Allow API access for this tenant
                    </p>
                  </div>
                  <div className="flex items-center">
                    {isEditing ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={tenant.settings.apiAccess} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    ) : (
                      tenant.settings.apiAccess ? (
                        <span className="inline-flex items-center text-green-500">
                          <Check className="h-4 w-4 mr-1" />
                          Enabled
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-red-500">
                          <X className="h-4 w-4 mr-1" />
                          Disabled
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <RoleGuard
            allowedRoles={["platform_admin"]}
            fallback={null}
          >
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-red-500">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions that affect this tenant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-md border-red-200 dark:border-red-800">
                  <div>
                    <h3 className="font-medium">Delete Tenant</h3>
                    <p className="text-sm text-muted-foreground">
                      This will permanently delete this tenant and all associated data.
                    </p>
                  </div>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Tenant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </RoleGuard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
