import React, { useEffect, useState } from "react";
import Link from "next/link";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { cart_list, closeUserSidebar } from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  useLogoutMutation,
  useNobelsetCategoryListMutation,
} from "@/redux/features/productApi";
import { useSetState } from "@/utils/functions";
import Loader from "../loader/loader";

const MobileMenus = () => {
  const [isActiveMenu, setIsActiveMenu] = useState("");
  const [token, setToken] = useState("");
  const [logoutRefetch] = useLogoutMutation();

  const [state, setState] = useSetState({
    categoryList: [],
  });

  const [categoryLists, { loading: loading }] =
    useNobelsetCategoryListMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpenSubMenu = (title) => {
    setIsActiveMenu((prev) => (prev === title ? "" : title));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const closeCart = async () => {
    try {
      await logoutRefetch({});
      dispatch(userLoggedOut());
      dispatch(closeUserSidebar());
      router.push("/login");
      if (token) {
        dispatch(cart_list([]));
        localStorage.clear();
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const categoryList = async () => {
    try {
      const res = await categoryLists();
      const category = res?.data?.data?.categories?.edges;
      if (category?.length > 0) {
        const categoryList = res?.data?.data?.categories?.edges?.map(
          (item) => ({
            name: item?.node?.name,
            id: item?.node?.id,
            slug: item?.node?.slug,
          })
        );
        setState({ categoryList });
      }

      setIsActiveMenu(!isActiveMenu);
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  return (
    <>
      <ul>
        <li>
          <Link href="/" style={{ fontWeight: "500" }}>
            ALL JEWELLERY
          </Link>
        </li>

        <li className="has-dropdown has-mega-menu">
          <button
            useNobelsetCategoryListMutation
            onMouseEnter={() => categoryList()}
            // onMouseLeave={() => setIsActiveMenu(false)}
            onClick={() => categoryList()}
            style={{
              fontWeight: "500",
              paddingTop: "18px",
              paddingBottom: "10px",
              fontSize: "16px",
              color: "black",
            }}
          >
            COLLECTIONS
          </button>
          {isActiveMenu && (
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isActiveMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {loading ? (
                <Loader />
              ) : state.categoryList?.length > 0 ? (
                state.categoryList?.map((item) => (
                  <ul className="pl-4 pt-2 space-y-2">
                    <li>
                      <Link
                        href={`/shop?category=${item?.slug
                          .toLowerCase()
                          .replace("&", "")
                          .split(" ")
                          .join("-")}`}
                      >
                        {item?.name}
                      </Link>
                    </li>
                  </ul>
                ))
              ) : (
                <div>No Category Found</div>
              )}
            </div>
          )}
        </li>

        <li>
          <Link href="/about" style={{ fontWeight: "500" }}>
            SILVER
          </Link>
        </li>

        <li>
          <Link href="/gift-card" style={{ fontWeight: "500" }}>
            GIFTING
          </Link>
        </li>

        {token && (
          <li>
            <Link href="/wishlist" style={{ fontWeight: "500" }}>
              WISHLIST
            </Link>
          </li>
        )}

        <li>
          <Link href="/compare" style={{ fontWeight: "500" }}>
            COMPARE
          </Link>
        </li>

        <li>
          <Link href="/login" style={{ fontWeight: "500" }}>
            <button style={{ fontWeight: "500" }} onClick={closeCart}>
              {token ? "LOGOUT" : "LOGIN / REGISTER"}
            </button>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default MobileMenus;
