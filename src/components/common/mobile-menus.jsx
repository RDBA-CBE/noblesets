import React, { useEffect, useState } from "react";
import Link from "next/link";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { cart_list, closeUserSidebar } from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  useLogoutMutation,
  useNobelsetCategoryListMutation,
  useSubCatListMutation,
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
  const [subCategories, setSubCategories] = useState({});
  const [fetchedSlugs, setFetchedSlugs] = useState(new Set());
  const [openSubMenu, setOpenSubMenu] = useState("");

  const [categoryLists, { loading: loading }] =
    useNobelsetCategoryListMutation();

  const [subCatList, { isLoading: subCatLoading }] = useSubCatListMutation();


  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpenSubMenu = async (slug) => {
    if (openSubMenu === slug) {
      setOpenSubMenu("");
      return;
    }
    if (!fetchedSlugs.has(slug)) {
      const res = await subCatList({ slug });
      const children = res?.data?.data?.category?.children?.edges || [];
      setSubCategories((prev) => ({ ...prev, [slug]: children }));
      setFetchedSlugs((prev) => new Set([...prev, slug]));
      if (children.length === 0) return;
    }
    setOpenSubMenu(slug);
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

        console.log("category",category)
  
      if (category?.length > 0) {
        const categoryList = category.map((item) => ({
          name: item?.node?.name,
          id: item?.node?.id,
          slug: item?.node?.slug,
          parent:item?.node?.parent?.name
        }));
  
        const excludeCategories = categoryList.filter(
          (item) =>
            item.slug !== "gift-card" &&
            item.slug !== "best-of-noblesets" && item.slug !== "our-best-sellers" && item.slug !== "gifting-special"
        );
        console.log("categoryList",excludeCategories)
  
        setState({ categoryList: excludeCategories });

        // Fetch all subcategories upfront
        const results = await Promise.all(
          excludeCategories.map((cat) => subCatList({ slug: cat.slug }))
        );
        const newSubCategories = {};
        const newFetchedSlugs = new Set();
        excludeCategories.forEach((cat, i) => {
          const children = results[i]?.data?.data?.category?.children?.edges || [];
          newSubCategories[cat.slug] = children;
          newFetchedSlugs.add(cat.slug);
        });
        setSubCategories(newSubCategories);
        setFetchedSlugs(newFetchedSlugs);
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
          <Link
            href="/"
            style={{
              fontWeight: "400",
              color: "#000",
              fontFamily: "Bagind,sans-serif",
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/shop"
            style={{
              fontWeight: "400",
              color: "#000",
              fontFamily: "Bagind,sans-serif",
            }}
          >
            Shop
          </Link>
        </li>
        {/* <li>
          <Link href="/shop" style={{ fontWeight: "500" }}>
            All Jewellery 
          </Link>
        </li> */}

        <li className="has-dropdown has-mega-menu">
          <a href="#">
            <button
              useNobelsetCategoryListMutation
              // onMouseEnter={() => categoryList()}
              // onMouseLeave={() => setIsActiveMenu(false)}
              onClick={() => categoryList()}
              style={{
                width: "100%",
                fontWeight: "500",
                // paddingTop: "18px",
                // paddingBottom: "10px",
                fontSize: "16px",
                color: "black",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "cemter",
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
                  <ul className="pt-2 space-y-2" style={{ paddingLeft: 0, listStyle: "none" }}>
                    <li style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Link
                          href={`/shop?category=${item?.slug
                            .toLowerCase()
                            .replace("&", "")
                            .split(" ")
                            .join("-")}`}
                          style={{ textTransform: "capitalize", paddingLeft: 0 }}
                        >
                          {item?.name.toLowerCase()}
                        </Link>
                        {(!fetchedSlugs.has(item?.slug) || subCategories[item?.slug]?.length > 0) && (
                          <div onClick={() => handleOpenSubMenu(item?.slug)} style={{ cursor: "pointer" }}>
                            <DropdownIcon />
                          </div>
                        )}
                      </div>
                      {openSubMenu === item?.slug && subCategories[item?.slug]?.length > 0 && (
                        <ul className="pl-4 pt-1 space-y-1">
                          {subCategories[item?.slug].map((sub) => (
                            <li key={sub?.node?.id}>
                              <Link
                                href={`/shop?category=${sub?.node?.slug}`}
                                style={{ textTransform: "capitalize", fontSize: "14px" }}
                              >
                                {sub?.node?.name.toLowerCase()}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  </ul>
                ))
              ) : (
                <div>No Category Found</div>
              )}
            </div>
          )}
        </li>

        {/* <li>
          <Link href="/shop?category=silver" style={{ fontWeight: "500" }}>
            Silver
          </Link>
        </li> */}
       

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
          <Link
            href="/our-story"
            style={{
              fontWeight: "500",
            }}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            style={{
              fontWeight: "500",
            }}
          >
            Contact
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
