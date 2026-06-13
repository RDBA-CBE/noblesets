import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { RightOutlined } from "@ant-design/icons";
import {
  useFeatureProductQuery,
  useGetProductTypeQuery,
  useGetSubCategoryListQuery,
  useGetProductsByCategoryMutation,
  useNobelsetCategoryListMutation,
  usePriceFilterMutation,
  useSubCatListMutation,
} from "@/redux/features/productApi";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MenusProductSlider from "./menus-product-slider";
import { HomeTwoPopularPrdLoader } from "@/components/loader";
import CommonImage from "../../../../public/assets/img/earring-menu-pic-1.png";
import Loader from "../../../components/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { filterData } from "@/redux/features/shop-filter-slice";
import { useSetState } from "@/utils/functions";
import MenusProductSlider1 from "./menus-product-slider1";
import { ArrowNextSm } from "@/svg";

const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 10,
  pagination: {
    el: ".tp-category-slider-dot-4",
    clickable: true,
  },
  breakpoints: {
    1400: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

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

const pill = {
  fontSize: "14px",
  padding: "0px 15px",
  borderRadius: "20px",
  border: "1px solid #e0d0c8",
  color: "#643333",
  background: "#fff5f0",
  cursor: "pointer",
  whiteSpace: "nowrap",
  textDecoration: "none",
  display: "inline-block",
};

const att = {
  fontSize: "14px",
  // padding: "0px 15px",
  borderRadius: "20px",
  // border: "1px solid #e0d0c8",
  color: "#643333",
  // background: "#fff5f0",
  fontWeight: 500,
  cursor: "pointer",
  whiteSpace: "nowrap",
  textDecoration: "none",
  display: "inline-block",
};

const sectionLabel = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#000",
  // textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: "8px",
  display: "block",
  borderBottom:"1px solid #000",
  width: "fit-content",
  lineHeight: "20px"
};

const CategoryContent = ({
  title,
  commonImage,
  children,
  lists,
  categoryName,
  subCategoryLoading,
  SubCatProduct,
  hoveredSubCategory,
  onSubCategoryHover,
}) => {
  useEffect(() => {
    return () => {
      if (hoverTimer.current) {
        clearTimeout(hoverTimer.current);
        hoverTimer.current = null;
      }
    };
  }, []);

  const router = useRouter();
  const hoverTimer = useRef(null);
  const subCategoryParam = hoveredSubCategory ? `&subCategory=${hoveredSubCategory}` : "";

  return (
    <div className="row m-0" style={{ paddingBottom: "30px", height: "100%" }}>
      <div
        className="col-2 "
        style={{
          // paddingLeft: "30px",
          height: "100%",
          overflowY: "scroll",
          scrollbarWidth: "thin",
          padding: "0",
        }}
      >
        {title && (
          <div style={{ paddingLeft: "25px" }}>
            <h6 style={{ paddingBottom: "15px", fontWeight: "500" }}>
              {title}
            </h6>
          </div>
        )}

        {subCategoryLoading ? (
          <SingleLoader loading={subCategoryLoading} />
        ) : (
          <div>
            <ul style={{ height: "100%" }}>
              {lists?.slice(0, 12)?.map((item) => {
                return (
                  <li
                    className="sub-sub-menu"
                    style={{
                      cursor: "pointer",
                      background: "#f1e7e1",
                      // borderBottom: "1px solid #e8e3e3",
                      // marginBottom: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px",
                      fontSize: "16px",
                      borderRadius: "5px",
                    }}
                    onMouseEnter={() => {
                      if (hoverTimer.current) clearTimeout(hoverTimer.current);
                      hoverTimer.current = setTimeout(() => {
                        onSubCategoryHover(item?.node?.slug);
                        SubCatProduct(item);
                      }, 120);
                    }}
                    key={item?.node?.slug}
                    onMouseLeave={() => {
                      if (hoverTimer.current) {
                        clearTimeout(hoverTimer.current);
                        hoverTimer.current = null;
                      }
                    }}
                    onClick={() => {
                      if (hoverTimer.current) {
                        clearTimeout(hoverTimer.current);
                        hoverTimer.current = null;
                      }
                      onSubCategoryHover(item?.node?.slug);
                      router?.push({
                        pathname: "/shop",
                        query: {
                          category: categoryName,
                          subCategory: item?.node?.slug,
                        },
                      });
                    }}
                  >
                    <a
                      href={`/shop?category=${categoryName}&subCategory=${item?.node?.slug}`}
                      className="cursor-pointer"
                      style={{
                        fontWeight: "500",
                        marginBottom: "0px",
                        color: "#643333",
                        cursor: "pointer",
                        fontSize: "16px",
                        textTransform: "capitalize",
                      }}
                      onClick={() => {
                        router.push({
                          pathname: "/shop",
                          query: {
                            category: categoryName,
                            subCategory: item?.node?.slug,
                          },
                        });
                      }}
                    >
                      {item?.node?.name.toLowerCase()}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {lists?.length > 3 ? (
          <></>
        ) : (
          <></>
          // <div>
          //   <div>
          //     {commonImage ? (
          //       <img
          //         src={commonImage}
          //         // src="assets/img/blog.webp"
          //         alt="category image"
          //         style={{
          //           width: "100%",
          //           height: "250px",
          //           objectFit: "cover",
          //           objectPosition: "center",
          //           borderRadius: "10px",
          //         }}
          //       />
          //     ) : (
          //       <img
          //         src={"/assets/img/earring-menu-pic-1.png"}
          //         alt="category image"
          //         style={{ width: "100%", height: "250px" }}
          //       />
          //     )}
          //   </div>
          //   <div style={{ textAlign: "center", padding: "20px 0px" }}>
          //     <h5 style={{ fontWeight: "400", fontSize: "20px" }}>
          //       Excepteur sint occaecat
          //       <br /> cupidatat
          //     </h5>
          //     <button
          //       className="tp-btn tp-btn-border"
          //       onClick={() => {
          //         router?.push({
          //           pathname: "/shop",
          //           // query: { category: parentCategoryId }, // Your parameters
          //         });
          //       }}
          //       style={{ padding: "5px 18px" }}
          //     >
          //       Shop Now
          //     </button>
          //   </div>
          // </div>
        )}
      </div>
      <div className="col-10 col-2xl-9" style={{ height: "350px" }}>
        <div className="row h-100" style={{ padding: "0px 0px 0 5px" }}>
          {children}
        </div>
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

  const renderContent = () => {
    if (productLoading || catLoading) {
      return (
        <div className="col-12 d-flex align-items-center justify-content-center h-100">
          <Loader loading={true} />
        </div>
      );
    }

    const hasProducts = productList?.length > 0;

    // Split attrs: Karatage + Cent share one column; others get their own
    const pairedNames = ["Karatage", "Cent"];
    const pairedAttrs = uniqueAttributes?.filter((a) => pairedNames.includes(a.name));
    const soloAttrs = uniqueAttributes?.filter((a) => !pairedNames.includes(a.name));

    return hasProducts ? (
      <>
        <div className="col-8">
          <div className="row gap-3">
            {/* Solo attrs — Occasion, Stone Type each in own col */}
            {soloAttrs?.map((attr) => (
              <div className="col-2" key={attr.id} style={{ marginBottom: "16px" }}>
                <span style={sectionLabel}>{attr.name}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  {attr.values.slice(0, 7).map((val) => (
                    <a
                      key={val.id}
                      href={`/shop?category=${lastHoveredCategory}&attribute=${attr.slug}/${val.slug}${subCategoryParam}`}
                      style={att}
                      className="menu-pill"
                    >
                     <ArrowNextSm className="att-icon" /> {val.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {/* Karatage + Cent paired in one col, stacked vertically */}
            {pairedAttrs?.length > 0 && (
              <div className="col-2" style={{ marginBottom: "16px" }}>
                {pairedAttrs.map((attr) => (
                  <div key={attr.id} style={{ marginBottom: "10px" }}>
                    <span style={sectionLabel}>{attr.name}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                      {attr.values.slice(0, 7).map((val) => (
                        <a
                          key={val.id}
                          href={`/shop?category=${lastHoveredCategory}&attribute=${attr.slug}/${val.slug}${subCategoryParam}`}
                          style={att}
                          className="menu-pill "
                        >
                          <ArrowNextSm className="att-icon" /> {val.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Price col */}
            <div className="col-2">
              <span style={sectionLabel}>Price</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                {dynamicBudget?.map((b) => (
                  <a
                    key={b.label}
                    href={`/shop?category=${lastHoveredCategory}&minPrice=${b.min}&maxPrice=${b.max}${subCategoryParam}`}
                    style={att}
                    className="menu-pill"
                  >
                    <ArrowNextSm  className="att-icon "/> {b.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Swiper
          slidesPerView={productList?.length > 0 ? 1 : 1}
          // spaceBetween={10}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop
          pagination={{
            el: ".tp-category-slider-dot-4",
            clickable: true,
          }}
          breakpoints={{
            // 1840: { slidesPerView: 4 },
            // 1600: { slidesPerView: 3.3 },
            // 1400: { slidesPerView: 3 },
            // 1300: { slidesPerView: 2.7 },
            // 1200: { slidesPerView: 2.3 },
            // 992: { slidesPerView: 3 },
            // 768: { slidesPerView: 2 },
            // 576: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          className="col-4 tp-category-slider-active-4 swiper-container h-100"
        >
          {productList?.map((item) => (
            <SwiperSlide key={item?.node?.id}>
              <div
                className={`${
                  productList?.length > 0 ? "col-lg-4" : "col-lg-3"
                } menus-product-list`}
                style={{ padding: "0px 8px 0px 0px", width: "100%" }}
              >
                {/* <MenusProductSlider product={item} /> */}
                <MenusProductSlider1 product={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    ) : (
      <div
        style={{
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        Product Not Found
      </div>
    );
  };

  const renderCategoryContent = () => {
    return (
      <CategoryContent
        // title={title}
        commonImage={commonImage}
        lists={subCategoryList}
        categoryName={lastHoveredCategory}
        subCategoryLoading={subCategoryLoading}
        SubCatProduct={SubCatProduct}
        uniqueAttributes={uniqueAttributes}
        dynamicBudget={dynamicBudget}
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

const Menus1New = () => {
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

  // Define subCategoryParam for this scope. It will be an empty string
  // when rendering products/attributes directly from Menus1New (i.e., no subcategory is actively hovered).
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
        <div className="home-menu tp-submenu tp-mega-menu">
          <div className="row m-0" style={{ height: "100%" }}>
            <div
              className="col-lg-2"
              style={{
                backgroundColor: "#fff",
                padding: "0px",
                color: "black",
                // overflowY:"scroll",
                height: "100%",
              }}
            >
              <ul className="cat-main-dd" style={{ height: "100%" }}>
                {state.categoryList?.map((item) => {
                  return (
                    <li
                      key={item?.slug}
                      className={`shop-submenu-catageroy-list ${
                        lastHoveredCategory == item?.slug ? "active" : ""
                      }`}
                      onMouseEnter={() => {
                        hoverCategoryProduct(item?.slug, item?.id);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingRight: "10px",
                        borderRadius: "10px",
                      }}
                      onClick={() => {
                        router.push({
                          pathname: "/shop",
                          query: {
                            category: item?.slug,
                          },
                        });
                      }}
                    >
                      <a
                        href={`/shop?category=${item?.slug}`}
                        style={{
                          cursor: "pointer",
                          marginBottom: "0px",
                          textTransform: "capitalize",
                        }}
                        className={`shop-submenu-catageroy-list-a cursor-pointer ${
                          lastHoveredCategory == item?.slug ? "active" : ""
                        }`}
                        onClick={() => {
                          router.push({
                            pathname: "/shop",
                            query: {
                              category: item?.slug,
                            },
                          });
                        }}
                      >
                        {item?.name?.toLowerCase()}
                      </a>

                      <RightOutlined
                        style={{ cursor: "pointer", marginBottom: "0px" }}
                        className={`shop-submenu-catageroy-list-a ${
                          lastHoveredCategory == item?.slug ? "active" : ""
                        }`}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="col-lg-10 h-100 pe-0">
              <div className="tp-mega-menu-item h-100 ">
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
                    style={{ height: "100%" }}
                  />
                ) : (productLoading || catLoading) ? (
                  <SingleLoader loading={true} />
                ) : state.productList?.length > 0 ? (
                  <>
                    <div className="d-flex">
                      <div
                        className="col-lg-7"
                        style={{
                          backgroundColor: "#fff",
                          padding: "14px 12px",
                          borderRight: "1px solid #f0e8e4",
                          overflowY: "auto",
                          height: "100%",
                        }}
                      >
                        <div className="row m-0" style={{ height: "100%" }}>
                          {(() => {
                            const pairedNames = ["Karatage", "Cent"];
                            const pairedAttrs = state.uniqueAttributes?.filter((a) => pairedNames.includes(a.name));
                            const soloAttrs = state.uniqueAttributes?.filter((a) => !pairedNames.includes(a.name));
                            return (
                              <>
                                {soloAttrs?.map((attr) => (
                                  <div className="col-lg-2" key={attr.id} style={{ marginBottom: "16px" }}>
                                    <span style={sectionLabel}>{attr.name}</span>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                      {attr.values.slice(0, 7).map((val) => (
                                        <a
                                          key={val.id}
                                          href={`/shop?category=${lastHoveredCategory}&attribute=${attr.slug}/${val.slug}${subCategoryParam}`}
                                          style={att}
                                          className="menu-pill"
                                        >
                                          <ArrowNextSm className="att-icon" /> {val.name}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                                {pairedAttrs?.length > 0 && (
                                  <div className="col-lg-2" style={{ marginBottom: "16px" }}>
                                    {pairedAttrs.map((attr) => (
                                      <div key={attr.id} style={{ marginBottom: "10px" }}>
                                        <span style={sectionLabel}>{attr.name}</span>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                          {attr.values.slice(0, 7).map((val) => (
                                            <a
                                              key={val.id}
                                              href={`/shop?category=${lastHoveredCategory}&attribute=${attr.slug}/${val.slug}${subCategoryParam}`}
                                              style={att}
                                              className="menu-pill"
                                            >
                                             <ArrowNextSm  className="att-icon"/> {val.name}
                                            </a>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <div className="col-lg-2">
                                  <span style={sectionLabel}>Price</span>
                                  <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                    {state.dynamicBudget?.map((b) => (
                                      <a
                                        key={b.label}
                                        href={`/shop?category=${lastHoveredCategory}&minPrice=${b.min}&maxPrice=${b.max}${subCategoryParam}`}
                                        style={att}
                                        className="menu-pill "
                                      >
                                        <ArrowNextSm className="att-icon me-1"  />{b.label}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <Swiper
                          slidesPerView={1}
                          // spaceBetween={10}
                          modules={[Pagination, Autoplay]}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
                          loop
                          pagination={{
                            el: ".tp-category-slider-dot-4",
                            clickable: true,
                          }}
                          breakpoints={{
                            // 1740: { slidesPerView: 5.2 },
                            // 1590: { slidesPerView: 4.7 },
                            // 1500: { slidesPerView: 4.5 },
                            // 1380: { slidesPerView: 4 },
                            // 1200: { slidesPerView: 3.5 },
                            // 992: { slidesPerView: 3 },
                            // 768: { slidesPerView: 2 },
                            // 576: { slidesPerView: 2 },
                            0: { slidesPerView: 1 },
                          }}
                          className="tp-category-slider-active-4 swiper-container "
                        >
                          {state.productList?.map((item) => (
                            <SwiperSlide key={item?.node?.id}>
                              <div
                                className={`w-100 menus-product-list`}
                                style={{
                                  padding: "0px 8px 0px 0px",
                                  width: "100%",
                                }}
                              >
                                {/* <MenusProductSlider product={item} /> */}
                                <MenusProductSlider1 product={item} />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    Product Not Found
                  </div>
                )}
              </div>
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

export default Menus1New;
