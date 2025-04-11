"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Building, CreditCard, Users, Mail, Phone, MapPin } from "lucide-react";

export default function CreateTenantPage() {
  const router = useRouter();
  const [tenantName, setTenantName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [address, setAddress] = useState("");
  const [plan, setPlan] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly");
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, this would save to the database
    router.push("/dashboard/subscriptions");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Tenant</h1>
        <p className="text-muted-foreground">
          Set up a new tenant with subscription details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Tenant Information</CardTitle>
            <CardDescription>
              Basic information about the tenant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tenant Name</label>
                <Input 
                  placeholder="e.g., Acme Corporation" 
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Name</label>
                  <Input 
                    placeholder="e.g., John Smith" 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Email</label>
                  <Input 
                    type="email"
                    placeholder="e.g., john.smith@acme.com" 
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Phone</label>
                  <Input 
                    placeholder="e.g., +1 (555) 123-4567" 
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input 
                    placeholder="e.g., 123 Main St, City, State, ZIP" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
            <CardDescription>
              Configure the subscription plan for this tenant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subscription Plan</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  required
                >
                  <option value="">Select a plan</option>
                  <option value="starter">Starter</option>
                  <option value="professional">Professional</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Billing Cycle</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      name="billingCycle" 
                      value="monthly" 
                      checked={billingCycle === "monthly"}
                      onChange={() => setBillingCycle("monthly")}
                    />
                    <span>Monthly</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      name="billingCycle" 
                      value="annual" 
                      checked={billingCycle === "annual"}
                      onChange={() => setBillingCycle("annual")}
                    />
                    <span>Annual (Save 20%)</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Initial User Count</label>
                <Input 
                  type="number"
                  min="1"
                  placeholder="e.g., 5" 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Method</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="invoice">Invoice</option>
                  <option value="wire_transfer">Wire Transfer</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tenant Settings</CardTitle>
            <CardDescription>
              Configure initial settings for this tenant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="sso-enabled" className="mr-2" />
                <label htmlFor="sso-enabled">Enable Single Sign-On (SSO)</label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="mfa-required" className="mr-2" checked />
                <label htmlFor="mfa-required">Require Multi-Factor Authentication (MFA)</label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="api-access" className="mr-2" checked />
                <label htmlFor="api-access">Enable API Access</label>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Custom Domain (Optional)</label>
                <Input 
                  placeholder="e.g., platform.acme.com" 
                />
                <p className="text-xs text-muted-foreground">
                  Leave blank to use the default domain
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Create Tenant
          </Button>
        </div>
      </form>
    </div>
  );
}
