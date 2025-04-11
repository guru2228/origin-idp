"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { UserPlus, Mail } from "lucide-react";

export default function AddMemberPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    role: "contributor",
    workspaceId: "ws-1", // Default workspace ID for demo
    teamId: "", // Optional team ID
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real implementation, this would be an API call to add the member
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Member invitation sent successfully!");
      router.push(`/dashboard/workspaces/${formData.workspaceId}`);
    } catch (error) {
      toast.error("Failed to send invitation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock workspaces for demo
  const workspaces = [
    { id: "ws-1", name: "Frontend Platform" },
    { id: "ws-2", name: "Backend Services" },
    { id: "ws-3", name: "Data Platform" },
    { id: "ws-4", name: "Mobile Apps" },
  ];

  // Mock teams for demo
  const teams = [
    { id: "team-1", name: "Design System", workspaceId: "ws-1" },
    { id: "team-2", name: "Web Frontend", workspaceId: "ws-1" },
    { id: "team-3", name: "Mobile Frontend", workspaceId: "ws-1" },
    { id: "team-4", name: "API Team", workspaceId: "ws-2" },
    { id: "team-5", name: "Database Team", workspaceId: "ws-2" },
  ];

  // Filter teams based on selected workspace
  const filteredTeams = teams.filter(team => team.workspaceId === formData.workspaceId);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Add Member</h1>
        <p className="text-muted-foreground">
          Invite a new member to your workspace or team
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Member Details</CardTitle>
              <CardDescription>
                Provide information about the new member
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workspaceId">Workspace</Label>
                <Select
                  value={formData.workspaceId}
                  onValueChange={(value) => handleSelectChange("workspaceId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select workspace" />
                  </SelectTrigger>
                  <SelectContent>
                    {workspaces.map((workspace) => (
                      <SelectItem key={workspace.id} value={workspace.id}>
                        {workspace.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamId">Team (Optional)</Label>
                <Select
                  value={formData.teamId}
                  onValueChange={(value) => handleSelectChange("teamId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select team (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No specific team</SelectItem>
                    {filteredTeams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleSelectChange("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner (Full access)</SelectItem>
                    <SelectItem value="contributor">Contributor (Edit access)</SelectItem>
                    <SelectItem value="viewer">Viewer (Read-only access)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/dashboard/workspaces/${formData.workspaceId}`)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Invitation"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Bulk Invite</CardTitle>
            <CardDescription>
              Invite multiple members at once
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Bulk Invitation</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">
                You can upload a CSV file with email addresses to invite multiple members at once.
              </p>
              <Button variant="outline" className="mt-4">
                <UserPlus className="mr-2 h-4 w-4" />
                Upload CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
