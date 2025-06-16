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
import { ArrowNext } from "@/svg";
import DropdownIcon from "@/svg/DropdownIcon";

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
       const excludeGiftCard = categoryList?.filter(
          (item) => item.slug !== "gift-card"
        );
        setState({ categoryList: excludeGiftCard });
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
          <Link href="/shop" style={{ fontWeight: "500" }}>
            All Jewellery 
          </Link>
        </li>

        <li className="has-dropdown has-mega-menu">
          <a href="#">
            <button
            useNobelsetCategoryListMutation
            // onMouseEnter={() => categoryList()}
            // onMouseLeave={() => setIsActiveMenu(false)}
            onClick={() => categoryList()}
            style={{
              width:"100%",
              fontWeight: "500",
              // paddingTop: "18px",
              // paddingBottom: "10px",
              fontSize: "16px",
              color: "black",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"cemter"
              
            }}
          >
            Collections
            <DropdownIcon />
          </button>
          </a>
          
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
                          style={{textTransform:"capitalize"}}
                      >
                        {item?.name.toLowerCase()}
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
          <Link href="/shop?category=silver" style={{ fontWeight: "500" }}>
            Silver
          </Link>
        </li>

        <li>
          <Link href="/gift-card" style={{ fontWeight: "500" }}>
            Gift Card
          </Link>
        </li>

        {token && (
          <li>
            <Link href="/wishlist" style={{ fontWeight: "500" }}>
              Wishlist
            </Link>
          </li>
        )}

        <li>
          <Link href="/compare" style={{ fontWeight: "500" }}>
            Compare
          </Link>
        </li>

        <li>
          <Link href="/login" style={{ fontWeight: "500" }}>
            <button style={{ fontWeight: "500" }} onClick={closeCart}>
              {token ? "Logout" : "Login / Register"}
            </button>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default MobileMenus;
