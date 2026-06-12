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
  useFilterOptionMutation,
  usePriceFilterMutation,
} from "@/redux/features/productApi";
import { useSetState } from "@/utils/functions";
import Loader from "../loader/loader";
import DropdownIcon from "@/svg/DropdownIcon";

const STATIC_BUDGETS = [
  { label: "Under 10k", min: 0, max: 10000 },
  { label: "Under 20k", min: 0, max: 20000 },
  { label: "Under 30k", min: 0, max: 30000 },
  { label: "Under 40k", min: 0, max: 40000 },
  { label: "Under 50k", min: 0, max: 50000 },
  { label: "Under 60k", min: 0, max: 60000 },
  { label: "Under 70k", min: 0, max: 70000 },
  { label: "Under 80k", min: 0, max: 80000 },
  { label: "Under 90k", min: 0, max: 90000 },
  { label: "Above 90k", min: 90000, max: 99999999 },
];

const pill = {
  display: "inline-block",
  padding: "0px 15px",
  borderRadius: "20px",
  border: "1px solid #f1c5b8",
  background: "#fff5f2",
  color: "#7d4432",
  fontSize: "12px",
  cursor: "pointer",
  textDecoration: "none",
  margin: "3px",
  whiteSpace: "nowrap",
};

const sectionLabel = {
  fontSize: "11px",
  fontWeight: 700,
  color: "#555",
  textTransform: "uppercase",
  letterSpacing: "1px",
  margin: "12px 0 6px",
  display: "block",
};

// Attribute panel shown after clicking a subcategory
const SubCategoryPanel = ({ subCat, parentCatSlug, onBack }) => {
  const router = useRouter();
  const [filterOptions] = useFilterOptionMutation();
  const [priceFilter] = usePriceFilterMutation();
  const [attributeList, setAttributeList] = useState([]);
  const [dynamicBudget, setDynamicBudget] = useState(STATIC_BUDGETS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFilters();
  }, [subCat]);

  const loadFilters = async () => {
    setLoading(true);
    try {
      const slug = subCat.node.slug;
      const [filterRes, minRes, maxRes] = await Promise.all([
        filterOptions({
          filter: { categorySlugs: slug },
        }),
        priceFilter({
          filter: { categorySlugs: slug },
          sortBy: { direction: "ASC", field: "PRICE" },
          first: 1,
        }),
        priceFilter({
          filter: { categorySlugs: slug },
          sortBy: { direction: "DESC", field: "PRICE" },
          first: 1,
        }),
      ]);

      const raw = filterRes?.data?.data?.attributefilter?.filterData;
      if (raw) {
        const parsed = JSON.parse(raw);
        const uniqueAttributes = parsed?.edges?.map((e) => e.node) || [];

        const order = ["Occasion", "Karat", "Cent", "Shop For"];
        const filteredAttributes = uniqueAttributes
          .filter((attr) => order.includes(attr.name))
          .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name))
          .map((attr) => {
            if (attr.name === "Karat") {
              return {
                ...attr,
                name: "Karatage",
                choices: {
                  edges: attr.choices?.edges?.map((e) => ({
                    ...e,
                    node: {
                      ...e.node,
                      name: e.node.name.toUpperCase().includes("KT") ? e.node.name : `${e.node.name}KT`,
                    },
                  })),
                },
              };
            }
            if (attr.name === "Cent") {
              return {
                ...attr,
                choices: {
                  edges: attr.choices?.edges?.map((e) => {
                    const num = parseFloat(e.node.name);
                    return {
                      ...e,
                      node: {
                        ...e.node,
                        name: !isNaN(num) ? `${Math.round(num * 100)}CT` : e.node.name,
                      },
                    };
                  }),
                },
              };
            }
            return attr;
          });
        setAttributeList(filteredAttributes);
      }

      const dynamicMin =
        minRes.data?.data?.productsSearch?.edges?.[0]?.node?.pricing?.priceRange?.start?.gross?.amount || 0;
      const dynamicMax =
        maxRes.data?.data?.productsSearch?.edges?.[0]?.node?.pricing?.priceRange?.start?.gross?.amount || 0;

      const filteredBudget = STATIC_BUDGETS.filter((item) => {
        if (item.label.includes("Under")) {
          return item.max > dynamicMin && dynamicMin < 90000;
        } else {
          return dynamicMax > 90000 || dynamicMin >= 90000;
        }
      });
      setDynamicBudget(filteredBudget);
    } catch (error) {
      console.log("Error loading filters:", error);
    }
    setLoading(false);
  };

  const goToShop = (params) => {
    router.push({ pathname: "/shop", query: params });
  };

  return (
    <div style={{ padding: "0 4px" }}>
      {/* Back button */}
      <div
        onClick={onBack}
        style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", marginBottom: "10px", color: "#7d4432", fontWeight: 600, fontSize: "14px" }}
      >
        <span>←</span>
        <span>{subCat.node.name}</span>
      </div>

      {/* Featured / All */}
      {/* <span style={sectionLabel}>Featured</span>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <a href={`/shop?category=${subCat.node.slug}`} style={pill}>All {subCat.node.name}</a>
        <a href={`/shop?category=${subCat.node.slug}&sort=new`} style={pill}>New Arrival</a>
        <a href={`/shop?category=${subCat.node.slug}&sort=bestseller`} style={pill}>Best Seller</a>
      </div>*/}

      {loading ? (
        <div style={{ padding: "20px 0", textAlign: "center" }}><Loader loading={true} /></div>
      ) : (
        <>
          {attributeList.map((attr) => (
            <div key={attr.slug}>
              <span style={sectionLabel}>{attr.name}</span>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {attr.choices?.edges?.map((choice) => (
                  <a
                    key={choice.node.slug}
                    href={`/shop?category=${subCat.node.slug}&attribute=${attr.slug}/${choice.node.slug}`}
                    style={pill}
                    className="menu-pill"
                  >
                    {choice.node.name}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Price */}
          <span style={sectionLabel}>Price</span>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {dynamicBudget.map((b) => (
              <a
                key={b.label}
                href={`/shop?category=${subCat.node.slug}&minPrice=${b.min}&maxPrice=${b.max}`}
                style={pill}
              >
                {b.label}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const MobileMenus = () => {
  const [isActiveMenu, setIsActiveMenu] = useState("");
  const [token, setToken] = useState("");
  const [logoutRefetch] = useLogoutMutation();

  const [state, setState] = useSetState({ categoryList: [] });
  const [subCategories, setSubCategories] = useState({});
  const [fetchedSlugs, setFetchedSlugs] = useState(new Set());
  const [openSubMenu, setOpenSubMenu] = useState("");
  // selectedSubCat = { parentSlug, subCat node object }
  const [selectedSubCat, setSelectedSubCat] = useState(null);

  const [categoryLists, { loading }] = useNobelsetCategoryListMutation();
  const [subCatList] = useSubCatListMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
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
        const mapped = category.map((item) => ({
          name: item?.node?.name,
          id: item?.node?.id,
          slug: item?.node?.slug,
          parent: item?.node?.parent?.name,
        }));
        const excludedSlugs = ["gift-card", "best-of-noblesets", "best-sellers", "gifting-special", "our-best-sellers"];
        const categoryOrder = ["gold", "diamond", "silver"];
        const filtered = mapped
          .filter((item) => !excludedSlugs.includes(item.slug))
          .sort((a, b) => {
            const ai = categoryOrder.findIndex((o) => a.slug.toLowerCase().includes(o));
            const bi = categoryOrder.findIndex((o) => b.slug.toLowerCase().includes(o));
            return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
          });
        setState({ categoryList: filtered });

        const results = await Promise.all(filtered.map((cat) => subCatList({ slug: cat.slug })));
        const newSubs = {};
        const newSlugs = new Set();
        filtered.forEach((cat, i) => {
          const children = results[i]?.data?.data?.category?.children?.edges || [];
          newSubs[cat.slug] = children;
          newSlugs.add(cat.slug);
        });
        setSubCategories(newSubs);
        setFetchedSlugs(newSlugs);
      }
      setIsActiveMenu(!isActiveMenu);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleOpenSubMenu = (slug) => {
    setOpenSubMenu(openSubMenu === slug ? "" : slug);
  };

  // If a subcategory is selected, show its attribute panel
  if (selectedSubCat) {
    return (
      <div style={{ padding: "4px 0" }}>
        <SubCategoryPanel
          subCat={selectedSubCat.subCat}
          parentCatSlug={selectedSubCat.parentSlug}
          onBack={() => setSelectedSubCat(null)}
        />
      </div>
    );
  }

  return (
    <>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li>
          <Link href="/" style={{ fontWeight: "400", color: "#000", fontFamily: "Bagind,sans-serif" }}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/shop" style={{ fontWeight: "400", color: "#000", fontFamily: "Bagind,sans-serif" }}>
            Shop
          </Link>
        </li>

        <li className="has-dropdown has-mega-menu">
          <a href="#">
            <button
              onClick={() => categoryList()}
              style={{ width: "100%", fontWeight: "500", fontSize: "16px", color: "black", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              Collections
              <DropdownIcon />
            </button>
          </a>

          {isActiveMenu && (
            <div>
              {loading ? (
                <Loader />
              ) : state.categoryList?.length > 0 ? (
                state.categoryList.map((item) => (
                  <ul key={item.slug} style={{ paddingLeft: 0, listStyle: "none", marginBottom: "4px" }}>
                    <li>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        {subCategories[item.slug]?.length > 0 ? (
                          <>
                            <Link
                              href={`/shop?category=${item.slug}`}
                              style={{ textTransform: "capitalize", paddingLeft: 0 }}
                            >
                              {item.name.toLowerCase()}
                            </Link>
                            <div onClick={() => handleOpenSubMenu(item.slug)} style={{ cursor: "pointer" }}>
                              <DropdownIcon />
                            </div>
                          </>
                        ) : (
                          <div
                            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", cursor: "pointer" }}
                            onClick={() => setSelectedSubCat({ parentSlug: null, subCat: { node: item } })}
                            className="p-2 pe-0"
                          >
                            <span style={{ textTransform: "capitalize" }}>{item.name.toLowerCase()}</span>
                            <span style={{ fontSize: "16px", }}> <DropdownIcon /></span>
                          </div>
                        )}
                      </div>

                      {/* Subcategory list — clicking one opens attribute panel */}
                      {openSubMenu === item.slug && subCategories[item.slug]?.length > 0 && (
                        <ul style={{ paddingLeft: "12px", paddingTop: "4px", listStyle: "none" }}>
                          {subCategories[item.slug].map((sub) => (
                            <li
                              key={sub?.node?.id}
                              style={{ padding: "5px 0", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
                              onClick={() => setSelectedSubCat({ parentSlug: item.slug, subCat: sub })}
                            >
                              <span style={{ textTransform: "capitalize", fontSize: "14px", color: "#333" }}>
                                {sub?.node?.name?.toLowerCase()}
                              </span>
                              <span style={{ fontSize: "12px", color: "#999" }}><DropdownIcon /></span>
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

        <li>
          <Link href="/gift-card" style={{ fontWeight: "500" }}>Gift Card</Link>
        </li>
        {token && (
          <li>
            <Link href="/wishlist" style={{ fontWeight: "500" }}>Wishlist</Link>
          </li>
        )}
        <li>
          <Link href="/compare" style={{ fontWeight: "500" }}>Compare</Link>
        </li>
        <li>
          <Link href="/our-story" style={{ fontWeight: "500" }}>About</Link>
        </li>
        <li>
          <Link href="/contact" style={{ fontWeight: "500" }}>Contact</Link>
        </li>
        <li>
          <Link href="/login" style={{ fontWeight: "500" }}>
            <button style={{ fontWeight: "500", background: "none", border: "none", cursor: "pointer", padding: 0 }} onClick={closeCart}>
              {token ? "Logout" : "Login / Register"}
            </button>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default MobileMenus;
