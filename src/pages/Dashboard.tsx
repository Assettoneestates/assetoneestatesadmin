import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Home,
  UserCheck,
  UserX,
  Clock,
  BarChart2,
  Activity,
  Calendar,
} from "lucide-react";
import Layout from "../components/Layout";
import { DashboardData } from "../types";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          "https://assettone-rental-management-production.up.railway.app/super/api/v1/dashboard/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="text-center p-10">
          <p className="text-lg text-gray-600">
            Unable to load dashboard data.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  // Calculate percentage for active landlords
  const activePercentage =
    data.landlord_count > 0
      ? Math.round((data.active_landlords / data.landlord_count) * 100)
      : 0;

  return (
    <Layout>
      <div className="space-y-6 pb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome back! Here's your latest statistics
            </p>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100">
            <p className="text-sm font-medium text-green-700">
              <span className="text-green-800">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Landlords</p>
                <p className="text-2xl font-bold text-gray-800">
                  {data.landlord_count}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  All registered property owners
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Landlords</p>
                <p className="text-2xl font-bold text-gray-800">
                  {data.active_landlords}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  {activePercentage}% of total landlords
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Inactive Landlords</p>
                <p className="text-2xl font-bold text-gray-800">
                  {data.inactive_landlords}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Requires attention
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <UserX className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Properties</p>
                <p className="text-2xl font-bold text-gray-800">
                  {data.property_count}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Listed real estate
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Home className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Graph Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity Panel */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <Activity className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Activity
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {data.recent_activity.length > 0 ? (
                data.recent_activity.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center justify-between py-4 group hover:bg-green-50 px-2 rounded-md transition-colors duration-150"
                  >
                    <div className="flex items-center">
                      <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-700 font-medium">
                          {profile.user.first_name.charAt(0)}
                          {profile.user.last_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {profile.user.first_name} {profile.user.last_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {profile.user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Last active:</p>
                        <p className="text-sm font-medium text-gray-700">
                          {new Date(profile.last_session).toLocaleDateString()}
                        </p>
                      </div>
                      <button className="ml-4 p-2 hover:bg-green-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                          className="h-5 w-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-gray-500">
                  <p>No recent activity to display</p>
                </div>
              )}
            </div>
            {data.recent_activity.length > 5 && (
              <div className="mt-4 text-center">
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                  View All Activity
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats Panel */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <BarChart2 className="h-5 w-5 text-green-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Quick Stats
                </h2>
              </div>
              <div>
                <select className="text-sm border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {/* Landlord Activity Meter */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Landlord Activity
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    {activePercentage}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${activePercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Property Distribution */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">
                  Property Types
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
                    <span className="text-sm text-gray-600">Residential</span>
                    <div className="ml-auto text-sm font-medium text-gray-700">
                      65%
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-300 mr-2"></div>
                    <span className="text-sm text-gray-600">Commercial</span>
                    <div className="ml-auto text-sm font-medium text-gray-700">
                      25%
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                    <span className="text-sm text-gray-600">Other</span>
                    <div className="ml-auto text-sm font-medium text-gray-700">
                      10%
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Preview */}
              <div>
                <div className="flex items-center mb-3">
                  <Calendar className="h-4 w-4 text-green-600 mr-2" />
                  <h3 className="text-sm font-medium text-gray-600">
                    Upcoming Events
                  </h3>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-md p-3">
                  <p className="text-sm font-medium text-green-800">
                    Property Review
                  </p>
                  <p className="text-xs text-gray-600">Tomorrow, 2:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button className="w-full py-2 bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded-md transition-colors duration-200">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
