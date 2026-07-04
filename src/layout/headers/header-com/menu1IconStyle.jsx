import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useGetProductsByCategoryMutation,
  useNobelsetCategoryListMutation,
  usePriceFilterMutation,
  useSubCatListMutation,
} from "@/redux/features/productApi";
import Loader from "../../../components/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { filterData } from "@/redux/features/shop-filter-slice";
import { useSetState } from "@/utils/functions";
import { ArrowNextSm } from "@/svg";

const STATIC_FILTERS = {
  occasion: ["Wedding", "Engagement", "Festive", "Daily Wear", "Gift", "Party"],
  metal: ["Gold", "Diamond", "Silver", "Platinum"],
  style: ["Classic", "Modern", "Vintage", "Minimalist", "Statement"],
  budget: [
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
  ],
};

const SUB_CATEGORY_IMAGES = {
  // Gold subcategories
  "pendant": "/assets/img/navbar/Gold pendant.svg",
  "pendant-2": "/assets/img/navbar/D - pendant.svg",
  "bangle": "/assets/img/navbar/Gold Bangle.svg",
  "earring": "/assets/img/navbar/Gold Earrings.svg",
  "rings": "/assets/img/navbar/Gold Ring.svg",
  "necklace": "/assets/img/navbar/Gold Ring-1.svg",
  "bracelets": "/assets/img/navbar/Gold Bangle.svg",
  "earrings-2": "/assets/img/navbar/Gold Earrings.svg",
  "bangle-1": "/assets/img/navbar/Gold Bangle.svg",
  "earrings-1": "/assets/img/navbar/Gold Earrings.svg",
  "ring-1": "/assets/img/navbar/Gold Ring.svg",
  "necklace-1": "/assets/img/navbar/Gold Ring-1.svg",
  "bracelet-1": "/assets/img/navbar/Gold Bangle.svg",
  // add more slug: "/assets/img/navbar/your-image.png" entries here
};

const DEFAULT_SUBCAT_IMG = "/assets/img/navbar/Gold Ring.svg";

const CATEGORY_META = {
  gold:    { tagline: "Timeless elegance",    icon: <img src="/assets/img/navbar/Gold.svg" alt="Gold" style={{ width: 60, height: 60, objectFit: "contain" }} /> },
  diamond: { tagline: "Brilliance that lasts", icon: <img src="/assets/img/navbar/Diamond.svg" alt="Diamond" style={{ width: 60, height: 60, objectFit: "contain" }} /> },
  silver:  { tagline: "Grace in every piece",  icon: <img src="/assets/img/navbar/Silver.svg" alt="Silver" style={{ width: 60, height: 60, objectFit: "contain" }} /> },
};

const ATTR_ICONS = {
  "Occasion":    <img src="/assets/img/navbar/Occasion.svg" alt="Occasion" style={{ width: 20, height:20, objectFit: "contain",marginTop: "-10px" }} />,
  "Stone Type":  <img src="/assets/img/navbar/Stone type.svg" alt="Stone Type" style={{ width: 20, height:20, objectFit: "contain",marginTop: "-10px" }} />,
  "Metal Color": <img src="/assets/img/navbar/Metal Color.svg" alt="Metal Color" style={{ width: 20, height:20, objectFit: "contain",marginTop: "-10px" }}/>,
  "Karatage":    <img src="/assets/img/navbar/Karatage.svg" alt="Karatage"style={{ width: 20, height:20, objectFit: "contain",marginTop: "-10px" }} />,
  "Cent":        <img src="/assets/img/navbar/Karatage.svg" alt="Cent" style={{ width: 20, height:20, objectFit: "contain",marginTop: "-10px" }}/>,
  "Price":       <img src="/assets/img/navbar/Price.svg" alt="Price" style={{ width: 20, height:20, objectFit: "contain",marginTop: "-10px" }} />,
};

const FOOTER_ITEMS = [
  { icon: "/assets/img/navbar/Certified.svg", title: "Certified Jewellery", sub: "Hallmarked & BIS Certified" },
  { icon: "/assets/img/navbar/Free Shiping.svg" , title: "Free Shipping", sub: "On all orders above ₹999" },
  { icon: "/assets/img/navbar/Esay Returns.svg" , title: "Easy Returns", sub: "15 days hassle-free returns" },
  { icon: "/assets/img/navbar/Secure payment.svg" , title: "Secure Payments", sub: "100% secure & encrypted" },
];

const CategoryContent = ({
  commonImage,
  lists,
  categoryName,
  subCategoryLoading,
  SubCatProduct,
  hoveredSubCategory,
  onSubCategoryHover,
  children,
}) => {
  const router = useRouter();
  const hoverTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      {/* Subcategory col */}
      <div style={{ width: "240px", flexShrink: 0, overflowY: "auto", padding: "0 10px", }}>
        {subCategoryLoading ? (
          <SingleLoader loading />
        ) : (
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", }}>
            {lists?.slice(0, 8)?.map((item) => {
              const isActive = hoveredSubCategory === item?.node?.slug;
              return (
                <li
                  key={item?.node?.slug}
                  onMouseEnter={() => {
                    if (hoverTimer.current) clearTimeout(hoverTimer.current);
                    hoverTimer.current = setTimeout(() => {
                      onSubCategoryHover(item?.node?.slug);
                      SubCatProduct(item);
                    }, 120);
                  }}
                  onMouseLeave={() => {
                    if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null; }
                  }}
                  onClick={() => {
                    if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null; }
                    onSubCategoryHover(item?.node?.slug);
                    router.push({ pathname: "/shop", query: { category: categoryName, subCategory: item?.node?.slug } });
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: isActive ? "#fdf3ee" : "#fff9f4",
                    border: "1px solid #f3eae4" ,
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{
                     borderRadius: "6px", overflow: "hidden",
                   flexShrink: 0, width:"50px", height:"60px",
                   flex:"0.6"
                  }}>
                    <img src={SUB_CATEGORY_IMAGES[item?.node?.slug] || DEFAULT_SUBCAT_IMG} alt={item?.node?.name} style={{ objectFit: "cover", width:"100%", height:"100%" , textAlign:"center", }} />
                  </div>
                  <span style={{ fontSize: "16px", fontWeight: 500, color: "#000", textTransform: "capitalize",flex:1  }}>
                    {item?.node?.name?.toLowerCase()}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {/* Attributes + product card */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
};

// cleanup any leftover timers on unmount
// (CategoryContent contains hoverTimer ref; ensure it's cleared when component unmounts)
// Note: we cannot access hoverTimer here; the cleanup is handled inside component scope via useEffect if needed.

const CategoryComponent = (props) => {
  const router = useRouter();
  const [hoveredSubCategory, setHoveredSubCategory] = useState("");

  useEffect(() => {
    setHoveredSubCategory("");
  }, [props.lastHoveredCategory]);

  const subCategoryParam = hoveredSubCategory
    ? `&subCategory=${hoveredSubCategory}`
    : "";
  const {
    productList,
    lastHoveredCategory,
    productLoading,
    catLoading,
    commonImage,
    subCategoryList,
    subCategoryLoading,
    SubCatProduct,
    uniqueAttributes,
    dynamicBudget,
  } = props;

  const renderAttributeColumns = (uniqueAttributes, dynamicBudget, lastHoveredCategory, subCategoryParam) => {
    const pairedNames = ["Karatage", "Cent"];
    const metalColorAttr = uniqueAttributes?.find((a) => a.name === "Metal Color");
    const metalDotColors = { yellow: "#f5c842", rose: "#e8a090", white: "#e0e0e0" };
    const pairedAttrs = uniqueAttributes?.filter((a) => pairedNames.includes(a.name));
    const soloAttrs = uniqueAttributes?.filter((a) => !pairedNames.includes(a.name) && a.name !== "Metal Color");

    return (
      <div style={{ display: "flex", gap: "0", height: "100%", padding: "16px 0 16px 16px", flex: 1 }}>
        {/* Solo attrs */}
        {soloAttrs?.map((attr) => (
          <div key={attr.id} style={{ minWidth: "160px", paddingRight: "16px", borderRight: "1px solid #f0e8e4", marginRight: "16px",  paddingLeft: "10px", }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px",}}>
              {ATTR_ICONS[attr.name]}
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#000", whiteSpace: "nowrap" ,marginBottom: "10px", paddingBottom: "6px", borderBottom: "2px solid #541816", width:"30%" }}>{attr.name}</span>
             
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {attr.values.slice(0, 7).map((val) => (
                <a key={val.id}
                  href={`/shop?category=${lastHoveredCategory}&attribute=${attr.slug}/${val.slug}${subCategoryParam}`}
                  style={{ fontSize: "10px", color: "#7d4432", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap" }}
                  className="mega-attr-link"
                >
                  <ArrowNextSm className="me-2" style={{color: "#7d4432", }} /> <span style={{ fontSize: "14px" ,color: "#7d4432", }}> {val.name}</span>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Metal Color */}
        {metalColorAttr && (
          <div style={{ minWidth: "160px", paddingRight: "16px", borderRight: "1px solid #f0e8e4", marginRight: "16px" , paddingLeft: "10px",}}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {ATTR_ICONS["Metal Color"]}
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#000", whiteSpace: "nowrap" ,marginBottom: "10px", paddingBottom: "6px", borderBottom: "2px solid #541816", width:"30%" }}>Metal Color</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {metalColorAttr.values.slice(0, 5).map((val) => {
                const dotColor = metalDotColors[val.name?.toLowerCase()] || "#ccc";
                return (
                  <a key={val.id}
                    href={`/shop?category=${lastHoveredCategory}&attribute=${metalColorAttr.slug}/${val.slug}${subCategoryParam}`}
                    style={{ fontSize: "10px", color: "#7d4432", textDecoration: "none", display: "flex", alignItems: "center", gap: "7px", whiteSpace: "nowrap" }}
                    className="mega-attr-link"
                  >
                    <span className="me-2" style={{ width: 15, height: 15, borderRadius: "50%", background: dotColor, border: "1px solid #ddd", flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontSize: "14px" ,color: "#7d4432"}} >{val.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Karatage + Cent paired */}
        {pairedAttrs?.length > 0 && (
          <div style={{ minWidth: "160px", paddingRight: "16px", borderRight: "1px solid #f0e8e4", marginRight: "16px" , paddingLeft: "10px",}}>
            {pairedAttrs.map((attr) => (
              <div key={attr.id} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {ATTR_ICONS[attr.name] || ATTR_ICONS["Karatage"]}
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "#000", whiteSpace: "nowrap" ,marginBottom: "10px", paddingBottom: "6px", borderBottom: "2px solid #541816", width:"30%"  }}>{attr.name}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {attr.values.slice(0, 5).map((val) => (
                    <a key={val.id}
                      href={`/shop?category=${lastHoveredCategory}&attribute=${attr.slug}/${val.slug}${subCategoryParam}`}
                      style={{ fontSize: "10px", color: "#7d4432", textDecoration: "none", display: "flex", alignItems: "center", gap: "7px", whiteSpace: "nowrap" }}
                      className="mega-attr-link"
                    >
                      <ArrowNextSm  className="me-2" style={{color: "#7d4432", }} /> <span style={{ fontSize: "14px" ,color: "#7d4432", }}> {val.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Price */}
        <div style={{ minWidth: "160px", paddingRight: "16px", paddingLeft: "10px", marginRight: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", }}>
            {ATTR_ICONS["Price"]}
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#000", whiteSpace: "nowrap" ,marginBottom: "10px", paddingBottom: "6px", borderBottom: "2px solid #541816", width:"30%" }}>Price</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {dynamicBudget?.map((b) => (
              <a key={b.label}
                href={`/shop?category=${lastHoveredCategory}&minPrice=${b.min}&maxPrice=${b.max}${subCategoryParam}`}
                style={{ fontSize: "10px", color: "#7d4432", textDecoration: "none", display: "flex", alignItems: "center", gap: "7px", whiteSpace: "nowrap" }}
                className="mega-attr-link"
              >
                <ArrowNextSm  className="me-2" style={{color: "#7d4432", }} /> <span style={{ fontSize: "14px" ,color: "#7d4432", }}> {b.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Featured product card */}
        <div style={{ flex: 1, minWidth: "180px", maxWidth: "380px" }}>
          {productList?.[0] && (
            <a
              href={`/product-details/${productList[0]?.node?.slug}`}
              style={{ display: "block", borderRadius: "12px", overflow: "hidden", height: "100%", position: "relative", textDecoration: "none" }}
            >
              <img
                src={productList[0]?.node?.thumbnail?.url}
                alt={productList[0]?.node?.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* New badge */}
              <span style={{
                position: "absolute", top: 12, left: 12,
                background: "#c8956c", color: "#fff", fontSize: "11px",
                fontWeight: 600, padding: "3px 10px", borderRadius: "20px",
              }}>New</span>
              {/* Bottom overlay */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(to top, rgba(30,10,5,0.85) 0%, transparent 100%)",
                padding: "40px 14px 14px",
              }}>
                <p style={{ color: "#e8c9b8", fontSize: "10px", fontWeight: 600, letterSpacing: "1.5px", margin: "0 0 4px", textTransform: "uppercase" }}>New Arrivals</p>
                <p style={{ color: "#fff", fontSize: "16px", fontWeight: 600, margin: "0 0 10px", lineHeight: 1.3 }}>Radiate Elegance</p>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: "#7d4432", color: "#fff", fontSize: "12px",
                  fontWeight: 500, padding: "7px 14px", borderRadius: "6px",
                }}>View Product →</span>
              </div>
            </a>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (productLoading || catLoading) {
      return (
        <div className="col-12 d-flex align-items-center justify-content-center h-100">
          <Loader loading={true} />
        </div>
      );
    }
    return renderAttributeColumns(uniqueAttributes, dynamicBudget, lastHoveredCategory, subCategoryParam);
  };

  const renderCategoryContent = () => {
    return (
      <CategoryContent
        commonImage={commonImage}
        lists={subCategoryList}
        categoryName={lastHoveredCategory}
        subCategoryLoading={subCategoryLoading}
        SubCatProduct={SubCatProduct}
        hoveredSubCategory={hoveredSubCategory}
        onSubCategoryHover={setHoveredSubCategory}
      >
        {renderContent()}
      </CategoryContent>
    );
  };

  return <div>{renderCategoryContent()}</div>;
};

function SingleLoader({ loading }) {
  return (
    <div
      className="col-12 d-flex align-items-center justify-content-center"
      style={{ height: "300px", width:"100%" }}
    >
      <Loader loading={loading} />
    </div>
  );
}

const Menu1IconStyle = () => {
  const router = useRouter();

  const [state, setState] = useSetState({
    categoryList: [],
    productList: [],
    subCategoryList: [],
    initalLoad: "",
    uniqueAttributes: [],
    dynamicBudget: STATIC_FILTERS.budget,
  });

  const [categoryLists, { loading: loading }] =
    useNobelsetCategoryListMutation();

  const [priceFilter, { isLoading: productLoading }] = usePriceFilterMutation();

  const [subCatList, { isLoading: subCatLoading }] = useSubCatListMutation();

  const [getProductsByCategory, { isLoading: catLoading }] =
    useGetProductsByCategoryMutation();

  const dispatch = useDispatch();
  const [lastHoveredCategory, setLastHoveredCategory] = useState("necklaces");

  const filterByHomePage = useSelector(
    (state) => state.shopFilter.filterByHomePage,
  );

  useEffect(() => {
    if (filterByHomePage) {
      dispatch(filterData(filterByHomePage));
    } else {
      dispatch(filterData({}));
    }
  }, [router]);

  useEffect(() => {
    categoryList();
  }, []);

  const categoryList = async () => {
    try {
      const res = await categoryLists();

      const category = res?.data?.data?.categories?.edges;
      if (category?.length > 0) {
        const categoryList = category.map((item) => ({
          name: item?.node?.name,
          id: item?.node?.id,
          slug: item?.node?.slug,
          productCount: item?.node?.products?.totalCount,
        }));

        // Exclude categories
        const excludedSlugs = [
          "gift-card",
          "best-of-noblesets",
          "best-sellers",
          "gifting-special",
        ];

        const categoryOrder = ["gold", "diamond", "silver"];

        // const filteredCategories = categoryList
        //   ?.filter((item) => !excludedSlugs.includes(item.slug))
        //   ?.filter((item) => item.productCount > 0);
        const filteredCategories = categoryList
          ?.filter((item) => !excludedSlugs.includes(item.slug))
          ?.filter((item) => item.productCount > 0)
          ?.sort((a, b) => {
            const aIndex = categoryOrder.findIndex((o) =>
              a.slug.toLowerCase().includes(o),
            );
            const bIndex = categoryOrder.findIndex((o) =>
              b.slug.toLowerCase().includes(o),
            );
            const aOrder = aIndex === -1 ? 999 : aIndex;
            const bOrder = bIndex === -1 ? 999 : bIndex;
            return aOrder - bOrder;
          });

        if (filteredCategories?.length > 0) {
          setState({
            initalLoadId: filteredCategories[0]?.id,
            initalLoad: filteredCategories[0]?.slug,
          });
        }

        setState({
          categoryList: filteredCategories,
        });
      }
    } catch (error) {
      console.log("✌️ error --->", error);
    }
  };

  const processAttributeData = (products) => {
    const attributeMap = new Map();
    products.forEach(({ node }) => {
      node.attributes.forEach((attr) => {
        if (!attr.values?.length) return;
        const key = attr.attribute.id;
        if (!attributeMap.has(key)) {
          attributeMap.set(key, { ...attr.attribute, values: [] });
        }
        const existing = attributeMap.get(key);
        attr.values.forEach((value) => {
          if (!existing.values.some((v) => v.id === value.id)) {
            existing.values.push(value);
          }
        });
      });
    });

    const uniqueAttributes = Array.from(attributeMap.values());
    const order = ["Occasion", "Karat","Stone Type", "Cent", "Metal Color"];
    return uniqueAttributes
      .filter((attr) => order.includes(attr.name))
      .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name))
      .map((attr) => {
        if (attr.name === "Karat") {
          return {
            ...attr,
            name: "Karatage",
            values: attr.values.map((v) => ({
              ...v,
              name: v.name.toUpperCase().includes("KT")
                ? v.name
                : `${v.name}KT`,
            })),
          };
        }
        if (attr.name === "Cent") {
          return {
            ...attr,
            values: attr.values.map((v) => {
              const num = parseFloat(v.name);
              return {
                ...v,
                name: !isNaN(num) ? `${Math.round(num * 100)}CT` : v.name,
              };
            }),
          };
        }

        if (attr.name === "Stone Type") {
          return {
            ...attr,
            name: "Stone Type",
            values: attr.values.map((v) => ({
              ...v,
              name: v.name
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase()),
            })),
          };
        }
        return attr;
      });
  };

  const updateDynamicBudget = async (slug) => {
    try {
      const [minRes, maxRes] = await Promise.all([
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

      const dynamicMin =
        minRes.data?.data?.productsSearch?.edges?.[0]?.node?.pricing?.priceRange
          ?.start?.gross?.amount || 0;
      const dynamicMax =
        maxRes.data?.data?.productsSearch?.edges?.[0]?.node?.pricing?.priceRange
          ?.start?.gross?.amount || 0;

      const filteredBudget = STATIC_FILTERS.budget.filter((item) => {
        if (item.label.includes("Under")) {
          return item.max > dynamicMin && dynamicMin < 90000;
        } else {
          return dynamicMax > 90000 || dynamicMin >= 90000;
        }
      });
      setState({ dynamicBudget: filteredBudget });
    } catch (error) {
      console.log("Error updating budget:", error);
    }
  };

  const hoverRequestId = useRef(0);

  const hoverCategoryProduct = async (slug, id) => {
    setLastHoveredCategory(slug);
    const thisId = ++hoverRequestId.current;

    // Clear immediately so stale data is never visible
    setState({ subCategoryList: [], productList: [], uniqueAttributes: [] });

    const [subcategory, productRes, attrRes] = await Promise.all([
      subCatList({ slug: slug }),
      priceFilter({
        filter: { categorySlugs: slug },
        sortBy: { direction: "DESC", field: "CREATED_AT" },
        first: 12,
        after: null,
      }),
      id ? getProductsByCategory({ categoryId: id }) : Promise.resolve(null),
    ]);

    if (thisId !== hoverRequestId.current) return; // stale — discard

    if (subcategory?.data?.data?.category?.children?.edges?.length > 0) {
      setState({
        subCategoryList:
          subcategory?.data?.data?.category?.children?.edges?.filter(
            (item) => item?.node?.products?.totalCount > 0,
          ),
      });
    } else {
      setState({ subCategoryList: [] });
    }

    const list =
      productRes?.data?.data?.productsSearch?.edges?.slice(0, 11) || [];
    const attrProducts = attrRes?.data?.data?.products?.edges || [];

    setState({
      productList: list,
      uniqueAttributes: processAttributeData(attrProducts),
    });

    updateDynamicBudget(slug);
  };

  const SubCatProduct = async (item) => {
    const slug = item?.node?.slug;
    const id = item?.node?.id;
    const thisId = ++hoverRequestId.current;

    setState({ productList: [], uniqueAttributes: [] });

    const [productRes, attrRes] = await Promise.all([
      priceFilter({
        filter: { categorySlugs: slug },
        sortBy: { direction: "DESC", field: "CREATED_AT" },
        first: 12,
        after: null,
      }),
      getProductsByCategory({ categoryId: id }),
    ]);

    if (thisId !== hoverRequestId.current) return; // stale — discard

    const list =
      productRes?.data?.data?.productsSearch?.edges?.slice(0, 11) || [];
    const attrProducts = attrRes?.data?.data?.products?.edges || [];

    setState({
      productList: list,
      uniqueAttributes: processAttributeData(attrProducts),
    });

    updateDynamicBudget(slug);
  };

  // console.log("productList", state.productList);

  const renderAttributeColumnsStandalone = () => {
    const pairedNames = ["Karatage", "Cent"];
    const metalColorAttr = state.uniqueAttributes?.find((a) => a.name === "Metal Color");
    const metalDotColors = { yellow: "#f5c842", rose: "#e8a090", white: "#e0e0e0" };
    const pairedAttrs = state.uniqueAttributes?.filter((a) => pairedNames.includes(a.name));
    const soloAttrs = state.uniqueAttributes?.filter((a) => !pairedNames.includes(a.name) && a.name !== "Metal Color");
    const firstProduct = state.productList?.[0];

    return (
      <div style={{ display: "flex", flex: 1, padding: "16px", gap: "0", overflowX: "auto" }}>
        {soloAttrs?.map((attr) => (
          <div key={attr.id} style={{ minWidth: "200px", paddingRight: "16px", borderRight: "1px solid #f0e8e4", marginRight: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px", paddingBottom: "6px", borderBottom: "2px solid #c8956c" }}>
              {ATTR_ICONS[attr.name]}
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#2d1a0e", whiteSpace: "nowrap" }}>{attr.name}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {attr.values.slice(0, 7).map((val) => (
                <a key={val.id}
                  href={`/shop?category=${lastHoveredCategory}&attribute=${attr.slug}/${val.slug}`}
                  style={{ fontSize: "13px", color: "#5a3a2a", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap" }}
                  className="mega-attr-link"
                >
                  <ArrowNextSm style={{ width: 6, height: 6, flexShrink: 0 }} /> {val.name}
                </a>
              ))}
            </div>
          </div>
        ))}
        {metalColorAttr && (
          <div style={{ minWidth: "180px", paddingRight: "16px", borderRight: "1px solid #f0e8e4", marginRight: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px", paddingBottom: "6px", borderBottom: "2px solid #c8956c" }}>
              {ATTR_ICONS["Metal Color"]}
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#2d1a0e" }}>Metal Color</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {metalColorAttr.values.slice(0, 5).map((val) => {
                const dotColor = metalDotColors[val.name?.toLowerCase()] || "#ccc";
                return (
                  <a key={val.id}
                    href={`/shop?category=${lastHoveredCategory}&attribute=${metalColorAttr.slug}/${val.slug}`}
                    style={{ fontSize: "13px", color: "#5a3a2a", textDecoration: "none", display: "flex", alignItems: "center", gap: "7px", whiteSpace: "nowrap" }}
                    className="mega-attr-link"
                  >
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: dotColor, border: "1px solid #ddd", flexShrink: 0, display: "inline-block" }} />
                    {val.name}
                  </a>
                );
              })}
            </div>
          </div>
        )}
        {pairedAttrs?.length > 0 && (
          <div style={{ minWidth: "180px", paddingRight: "16px", borderRight: "1px solid #f0e8e4", marginRight: "16px" }}>
            {pairedAttrs.map((attr) => (
              <div key={attr.id} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", paddingBottom: "6px", borderBottom: "2px solid #c8956c" }}>
                  {ATTR_ICONS[attr.name] || ATTR_ICONS["Karatage"]}
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#2d1a0e" }}>{attr.name}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {attr.values.slice(0, 5).map((val) => (
                    <a key={val.id}
                      href={`/shop?category=${lastHoveredCategory}&attribute=${attr.slug}/${val.slug}`}
                      style={{ fontSize: "13px", color: "#5a3a2a", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap" }}
                      className="mega-attr-link"
                    >
                      <ArrowNextSm style={{ width: 6, height: 6, flexShrink: 0 }} /> {val.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ minWidth: "180px", paddingRight: "16px", borderRight: "1px solid #f0e8e4", marginRight: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px", paddingBottom: "6px", borderBottom: "2px solid #c8956c" }}>
            {ATTR_ICONS["Price"]}
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#2d1a0e" }}>Price</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {state.dynamicBudget?.map((b) => (
              <a key={b.label}
                href={`/shop?category=${lastHoveredCategory}&minPrice=${b.min}&maxPrice=${b.max}`}
                style={{ fontSize: "13px", color: "#5a3a2a", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap" }}
                className="mega-attr-link"
              >
                <ArrowNextSm style={{ width: 6, height: 6, flexShrink: 0 }} /> {b.label}
              </a>
            ))}
          </div>
        </div>
        {/* Featured product card */}
        {firstProduct && (
          <div style={{ flex: 1, minWidth: "180px", maxWidth: "350px" }}>
            <a
              href={`/product-details/${firstProduct?.node?.slug}`}
              style={{ display: "block", borderRadius: "12px", overflow: "hidden", height: "100%", position: "relative", textDecoration: "none" }}
            >
              <img src={firstProduct?.node?.thumbnail?.url} alt={firstProduct?.node?.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <span style={{ position: "absolute", top: 12, left: 12, background: "#c8956c", color: "#fff", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px" }}>New</span>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(30,10,5,0.85) 0%, transparent 100%)", padding: "40px 14px 14px" }}>
                <p style={{ color: "#e8c9b8", fontSize: "10px", fontWeight: 600, letterSpacing: "1.5px", margin: "0 0 4px", textTransform: "uppercase" }}>New Arrivals</p>
                <p style={{ color: "#fff", fontSize: "16px", fontWeight: 600, margin: "0 0 10px", lineHeight: 1.3 }}>Radiate Elegance</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#7d4432", color: "#fff", fontSize: "12px", fontWeight: 500, padding: "7px 14px", borderRadius: "6px" }}>View Product →</span>
              </div>
            </a>
          </div>
        )}
      </div>
    );
  };

  // Define subCategoryParam for this scope.
  const subCategoryParam = "";
  return (
    <ul
      className="d-flex justify-content-center align-items-center mb-0"
      style={{
        listStyle: "none",
        height: "44px",
        gap: "40px",
        color: "#fff",
        fontSize: "15px",
        fontWeight: 500,
      }}
    >
      <li>
        <Link
          href="/"
          style={{
            fontWeight: "400",
            color: "#fff",
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
            color: "#fff",
            fontFamily: "Bagind,sans-serif",
          }}
        >
          Shop
        </Link>
      </li>
      {/* <li>
        <Link
          href="/shop"
          style={{
            fontWeight: "400",
            color: "#fff",
            fontFamily: "Bagind,sans-serif",
          }}
        >
          All Jewellery
        </Link>
      </li> */}
      <li className="has-dropdown has-mega-menu">
        <Link
          href="/shop"
          style={{
            fontWeight: "400",
            color: "#fff",
            fontFamily: "Bagind,sans-serif",
          }}
          onMouseEnter={() => {
            hoverCategoryProduct(
              state.initalLoad ?? "diamond",
              state.initalLoadId,
            );
          }}
        >
          Collections
        </Link>
        <div className="home-menu tp-submenu tp-mega-menu" style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.13)" }}>
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff" }}>
          <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            {/* Left: Category list */}
            <div style={{ width: "260px", flexShrink: 0, borderRadius: "10px", background: "#fff8f5", border: "1px solid #f3eae4", padding: "0", overflowY: "auto" }}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column",  }}>
                {state.categoryList?.map((item) => {
                  const meta = CATEGORY_META[item?.slug?.toLowerCase()] || { tagline: "", icon: "💍" };
                  const isActive = lastHoveredCategory === item?.slug;
                  return (
                    <li
                      key={item?.slug}
                      onMouseEnter={() => hoverCategoryProduct(item?.slug, item?.id)}
                      onClick={() => router.push({ pathname: "/shop", query: { category: item?.slug } })}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "25px 12px", borderRadius: "5px", cursor: "pointer",
                        background: isActive ? "#fff9f4" : "transparent",
                        border: isActive ? "1px solid #fde0d1" : "1px solid transparent",
                       
                        borderLeft: isActive ? "5px solid #c8956c" : "5px solid transparent",
                        transition: "all 0.15s",
                        marginBottom: "0px",
                        boxShadow: isActive ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: 50, height: 50, borderRadius: "8px",  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {meta.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: "16px", fontWeight: 600, color: isActive ? "#541816" : "#000", textTransform: "capitalize" }}>
                            {item?.name?.toLowerCase()}
                          </div>
                          <div style={{ fontSize: "14px", color: "#505050", marginTop: "3px" }}>{meta.tagline}</div>
                        </div>
                      </div>
                      {isActive && <span style={{ color: "#c8956c", fontSize: "25px" }}>›</span>}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right: subcategory + attributes + product card */}
            <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
              {subCatLoading ? (
                <SingleLoader loading={true} />
              ) : state.subCategoryList?.length > 0 ? (
                <CategoryComponent
                  commonImage="/assets/img/earring-menu-pic-1.png"
                  lastHoveredCategory={lastHoveredCategory}
                  productList={state.productList}
                  productLoading={productLoading}
                  catLoading={catLoading}
                  subCategoryList={state.subCategoryList}
                  subCategoryLoading={subCatLoading}
                  uniqueAttributes={state.uniqueAttributes}
                  dynamicBudget={state.dynamicBudget}
                  SubCatProduct={SubCatProduct}
                />
              ) : (productLoading || catLoading) ? (
                <SingleLoader loading={true} />
              ) : (
                <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
                  {renderAttributeColumnsStandalone()}
                </div>
              )}
            </div>
          </div>
          {/* Footer strip */}
          <div style={{ display: "flex", borderTop: "1px solid #f0e8e4", background: "#fff9f4", padding: "10px 20px", marginTop:"10px" }}>
            {FOOTER_ITEMS.map((item, i) => (
              <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px", padding: "0 16px", borderRight: i < FOOTER_ITEMS.length - 1 ? "1px solid #e8d8d0" : "none" }}>
                {/* <div style={{ flexShrink: 0 }}>{item.icon}</div> */}
                <img src={item.icon} alt="" style={{ width: "100px", height: "60px" }}/>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#2d1a0e" }}>{item.title}</div>
                  <div style={{ fontSize: "11px", color: "#9a7060" }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </li>

      {/* {state.token && ( */}
      <li>
        <Link
          href="/gift-card"
          style={{
            fontWeight: "400",
            color: "#fff",
            fontFamily: "Bagind,sans-serif",
          }}
        >
          Gift Card
        </Link>
      </li>
      <li>
        <Link
          href="/our-story"
          style={{
            fontWeight: "400",
            color: "#fff",
            fontFamily: "Bagind,sans-serif",
          }}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          style={{
            fontWeight: "400",
            color: "#fff",
            fontFamily: "Bagind,sans-serif",
          }}
        >
          Contact
        </Link>
      </li>
      {/* )} */}
    </ul>
  );
};

export default Menu1IconStyle;
