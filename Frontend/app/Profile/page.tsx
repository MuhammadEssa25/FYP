"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile"); // Manage active tab

  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main Street, City",
    password: "",
    image: "https://via.placeholder.com/150",
    wallet: 100.5,
    purchaseHistory: [
      { id: 1, item: "Laptop", date: "2024-02-20", amount: "$1200" },
      { id: 2, item: "Phone", date: "2024-01-15", amount: "$800" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md">
      <Tabs>
        <TabsList className="flex space-x-2 border-b p-2 bg-gray-100 rounded-lg">
          <TabsTrigger 
            value="profile" 
            onClick={() => setActiveTab("profile")} 
            isActive={activeTab === "profile"}
          >
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            onClick={() => setActiveTab("history")} 
            isActive={activeTab === "history"}
          >
            Purchase History
          </TabsTrigger>
          <TabsTrigger 
            value="wallet" 
            onClick={() => setActiveTab("wallet")} 
            isActive={activeTab === "wallet"}
          >
            Wallet
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          {activeTab === "profile" && (
            <TabsContent>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <Avatar>
                      <AvatarImage src={user.image} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <Label >Profile Picture</Label>
                      <Input type="file" name="image" onChange={() => {}} />
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label>Name</Label>
                    <Input name="name" value={user.name} onChange={handleChange} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input name="email" value={user.email} onChange={handleChange} />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input name="address" value={user.address} onChange={handleChange} />
                  </div>
                  <div>
                    <Label>New Password</Label>
                    <Input type="password" name="password" onChange={handleChange} />
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {activeTab === "history" && (
            <TabsContent>
              <Card>
                <CardHeader>
                  <CardTitle>Purchase History</CardTitle>
                </CardHeader>
                <CardContent>
                  {user.purchaseHistory.length > 0 ? (
                    user.purchaseHistory.map((purchase) => (
                      <div key={purchase.id} className="flex justify-between border-b p-3 bg-gray-50 rounded-lg">
                        <span className="font-semibold">{purchase.item}</span>
                        <span className="text-gray-500">{purchase.date}</span>
                        <span className="font-bold">{purchase.amount}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-black">No purchase history available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {activeTab === "wallet" && (
            <TabsContent>
              <Card>
                <CardHeader>
                  <CardTitle>Wallet Balance</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold text-black">${user.wallet.toFixed(2)}</p>
                  <Button className="w-full">Add Funds</Button>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
}
