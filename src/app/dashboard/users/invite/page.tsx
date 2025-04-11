"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowLeft, Save, UserPlus, Mail, Check } from "lucide-react";

export default function InviteUserPage() {
  const router = useRouter();
  const [emails, setEmails] = useState("");
  const [role, setRole] = useState("");
  
  // Mock data for roles
  const roles = [
    { id: "role-1", name: "Platform Admin" },
    { id: "role-2", name: "Tenant Admin" },
    { id: "role-3", name: "Product Owner" },
    { id: "role-4", name: "Engineer" },
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, this would send invitations
    router.push("/dashboard/users");
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
        <h1 className="text-3xl font-bold tracking-tight">Invite Users</h1>
        <p className="text-muted-foreground">
          Send invitations to new users
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Invitation Details</CardTitle>
            <CardDescription>
              Enter email addresses and select a role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Addresses</label>
                <Textarea 
                  placeholder="Enter email addresses, one per line" 
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  required
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground">
                  You can invite multiple users by entering one email address per line
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select a role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invitation Settings</CardTitle>
            <CardDescription>
              Configure additional invitation options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="send-welcome" className="mr-2" checked />
                <label htmlFor="send-welcome">Send welcome email with platform introduction</label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="add-to-workspace" className="mr-2" checked />
                <label htmlFor="add-to-workspace">Add users to default workspace</label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="require-password" className="mr-2" checked />
                <label htmlFor="require-password">Require password change on first login</label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">
            <UserPlus className="mr-2 h-4 w-4" />
            Send Invitations
          </Button>
        </div>
      </form>
    </div>
  );
}

// Textarea component
function Textarea({ className, ...props }) {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
