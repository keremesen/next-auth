"use client";
import Layout from "@/components/Layout/Layout";
import Sidebar from "@/components/Sidebar/Sidebar";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import Swal from "sweetalert2";

const handleDelete = async (id) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      Swal.fire("Deleted!", "User has been deleted.", "success");

      mutate("/api/users");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleEdit = async (id) => {
  try {
    await fetch(`/api/users/${id}`, {
      method: "POST",
    });
    mutate();
  } catch (error) {
    console.log(error);
  }
};

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [users, setUsers] = useState(null);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR("/api/users", fetcher);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router?.push("/");
  }

  if (session.status === "authenticated") {
    if(session.data.user.isAdmin){
      return (
        <Layout>
          <div className="flex w-full items-center justify-center">
            <div className="flex h-[524px] overflow-y-scroll rounded-md ">
              <table className="w-full text-sm text-left border-collapse bg-[#4444]">
                <thead className="font-bold uppercase text-center bg-[#3333] text-[#fff]">
                  <tr>
                    <th scope="col" className="px-12 py-4">
                      NAME
                    </th>
                    <th scope="col" className="px-12 py-4">
                      E-MAIL
                    </th>
                    <th scope="col" className="px-12 py-4">
                      PHONE
                    </th>
                    <th scope="col" className="px-12 py-4">
                      ROLE
                    </th>
                    <th scope="col" className="px-12 py-4"></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {isLoading ? (
                    <tr>
                      <td colSpan="5" className="px-12 py-4">
                        Loading
                      </td>
                    </tr>
                  ) : (
                    data?.map((item, idx) => (
                      <tr key={idx} className="border-b font-semibold h-24 ">
                        <td className="px-12 py-4">{item.name}</td>
                        <td className="px-12 py-4">{item.email}</td>
                        <td className="px-12 py-4">{item.phone}</td>
                        <td className="px-12 py-4">
                          {item.role ? "Admin" : "Member"}
                        </td>
                        <td className="px-12 py-4">
                          <div className="flex justify-center">
                            <Link
                              href={`/dashboard/user/${item.id}`}
                              className="mr-2"
                            >
                              <Image
                                alt="edit"
                                src="/assets/edit.svg"
                                width={20}
                                height={20}
                              />
                            </Link>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="mr-2"
                            >
                              <Image
                                alt="bin"
                                src="/assets/bin.svg"
                                width={20}
                                height={20}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Layout>
      );
    }
    else{
      return (
        <Layout>
          <div className="flex w-full items-center justify-center">
            <div className="flex h-[524px] overflow-y-scroll rounded-md ">
              <table className="w-full text-sm text-left border-collapse bg-[#4444]">
                <thead className="font-bold uppercase text-center bg-[#3333] text-[#fff]">
                  <tr>
                    <th scope="col" className="px-12 py-4">
                      NAME
                    </th>
                    <th scope="col" className="px-12 py-4">
                      E-MAIL
                    </th>
                    <th scope="col" className="px-12 py-4">
                      PHONE
                    </th>
                    <th scope="col" className="px-12 py-4">
                      ROLE
                    </th>
                    <th scope="col" className="px-12 py-4"></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {isLoading ? (
                    <tr>
                      <td colSpan="5" className="px-12 py-4">
                        Loading
                      </td>
                    </tr>
                  ) : (
                    data?.map((item, idx) => (
                      <tr key={idx} className="border-b font-semibold h-24 ">
                        <td className="px-12 py-4">{item.name}</td>
                        <td className="px-12 py-4">{item.email}</td>
                        <td className="px-12 py-4">{item.phone}</td>
                        <td className="px-12 py-4">
                          {item.role ? "Admin" : "Member"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Layout>
      );
    }
   
  }
};

export default Dashboard;
