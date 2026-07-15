import React from "react";
import {
  Mail,
  Users,
  Award,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
} from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

type SidebarProps = {
  user: User;
};

const Sidebar: NextPage<SidebarProps> = ({ user }) => {
  return (
    <aside
      id="default-sidebar"
      className="fixed top-15 left-0 w-56 h-screen transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 pt-16 overflow-y-auto bg-stone-800">
        {user.role === "admin" ? (
          <div className="space-y-2 font-medium">
            <div>
              <Link
                href="/admin"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group cursor-pointer"
              >
                <Users className="w-5 h-5 transition duration-75 text-gray-200 group-hover:text-white" />
                <span className="ms-3">Users</span>
              </Link>
            </div>
            <div>
              <Link
                href="/admin/products"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 transition duration-75 text-gray-200 group-hover:text-white" />
                <span className="ms-3">Products</span>
              </Link>
            </div>
            <div>
              <Link
                href="/admin/orders"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5 transition duration-75 text-gray-200 group-hover:text-white" />
                <span className="ms-3">Orders</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-2 font-medium">
            <div>
              <Link
                href="/user"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group cursor-pointer"
              >
                <CreditCard className="w-5 h-5 transition duration-75 text-gray-200 group-hover:text-white" />
                <span className="ms-3">Memory Card</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
