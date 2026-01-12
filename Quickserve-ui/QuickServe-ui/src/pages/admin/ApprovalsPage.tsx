import {DashboardLayout} from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

import {
  Check,
  X,
  Eye,
  Clock,
  FileText,
  MapPin,
  Star,
  Phone,
  Mail,
  Home,
  Users,
  Shield,
  BarChart3,
  Settings
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";



const navItems = [
  { icon: Home, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Shield, label: "Approvals", path: "/admin/approvals" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const ApprovalsPage = () => {
  const [stats, setStats] = useState<any>(null);
  const [pending, setPending] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  const fetchApprovals = () => {
    if (!token) return;

    fetch("http://localhost:8080/api/admin/approvals", {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(res => res.json())
        .then((data) => {
          setPending(data.filter((a: any) => a.approved === false));
          setRecent(
              data.filter(
                  (a: any) => a.approved === true || a.rejected === true
              )
          );
        });
  };


  useEffect(() => {
    fetchApprovals();
  }, [token]);


  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/admin/approvals/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(res => res.json())
        .then(setStats);
  }, [token]);


  const approve = (id: number) =>
      fetch(`http://localhost:8080/api/admin/approvals/${id}/approve`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).then(fetchApprovals);

  const reject = (id: number) =>
      fetch(`http://localhost:8080/api/admin/approvals/${id}/reject`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).then(fetchApprovals);





  return (
    <DashboardLayout role={"admin"} navItems={navItems}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="page-title">Service Provider Approvals</h1>
          <p className="text-muted-foreground mt-1">Review and approve incoming requests from service providers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="bg-warning/10 border-warning/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.approved}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <X className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.rejected}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.totalRequests}</p>
                <p className="text-sm text-muted-foreground">Total Requests</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">
              <Badge className="ml-2 h-5 px-1.5" variant="secondary">
                {pending.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="reviewed">Recently Reviewed</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pending.map((approval) => (
              <Card key={approval.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    {/* Provider Info */}
                    <div className="flex gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                          {approval.providerEmail
                              ?.charAt(0)
                              .toUpperCase()}

                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold text-lg">{approval.title}</h3>
                          <p className="text-primary font-medium">{approval.category}</p>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-4 h-4" />
                            {approval.providerEmail}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Phone className="w-4 h-4" />
                            {approval.phone}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {approval.location}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{approval.description}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary">{approval.category}</Badge>
                          <Badge variant="outline">{approval.experience} experience</Badge>
                          {approval.documents?.map((doc: string) => (
                              <Badge key={doc} variant="outline" className="bg-primary/5">
                                <FileText className="w-3 h-3 mr-1" />
                                {doc}
                              </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-3">
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {approval.submittedAt}
                      </span>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Provider Application Details</DialogTitle>
                              <DialogDescription>
                                Review the complete application for {approval.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Service</p>
                                  <p className="font-medium">{approval.service}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Category</p>
                                  <p className="font-medium">{approval.category}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Experience</p>
                                  <p className="font-medium">{approval.experience}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Location</p>
                                  <p className="font-medium">{approval.location}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">Documents Submitted</p>
                                <div className="flex gap-2">
                                  {approval.documents?.map((doc: string) => (
                                      <Badge key={doc} variant="secondary">
                                        <FileText className="w-3 h-3 mr-1" />
                                        {doc}
                                      </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">Description</p>
                                <p className="text-sm">{approval.description}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="destructive" size="sm" onClick={() => reject(approval.id)}>
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                        <Button size="sm" onClick={() => approve(approval.id)}>
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/*<TabsContent value="reviewed">*/}
          {/*  <Card>*/}
          {/*    <CardContent className="p-0">*/}
          {/*      <div className="divide-y">*/}
          {/*        {recentlyReviewed.map((item) => (*/}
          {/*          <div key={item.id} className="flex items-center justify-between p-4 hover:bg-muted/50">*/}
          {/*            <div className="flex items-center gap-3">*/}
          {/*              <Avatar>*/}
          {/*                <AvatarFallback className="bg-primary/10 text-primary text-sm">*/}
          {/*                  {item.initials}*/}
          {/*                </AvatarFallback>*/}
          {/*              </Avatar>*/}
          {/*              <div>*/}
          {/*                <p className="font-medium">{item.name}</p>*/}
          {/*                <p className="text-sm text-muted-foreground">{item.service}</p>*/}
          {/*              </div>*/}
          {/*            </div>*/}
          {/*            <div className="flex items-center gap-4">*/}
          {/*              <span className="text-sm text-muted-foreground">{item.reviewedAt}</span>*/}
          {/*              <Badge variant={item.status === "Approved" ? "default" : "destructive"}>*/}
          {/*                {item.status}*/}
          {/*              </Badge>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        ))}*/}
          {/*      </div>*/}
          {/*    </CardContent>*/}
          {/*  </Card>*/}
          {/*</TabsContent>*/}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ApprovalsPage;
