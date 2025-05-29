import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { RightOutlined } from "@ant-design/icons";
import {
  useFeatureProductQuery,
  useGetProductTypeQuery,
  useGetSubCategoryListQuery,
  useNobelsetCategoryListMutation,
  usePriceFilterMutation,
  useSubCatListMutation,
} from "@/redux/features/productApi";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MenusProductSlider from "./menus-product-slider";
import { HomeTwoPopularPrdLoader } from "@/components/loader";
import CommonImage from "../../../../public/assets/img/earring-menu-pic-1.png";
import Loader from "../../../components/loader/loader";
import { useDispatch } from "react-redux";
import { filterData } from "@/redux/features/shop-filter-slice";
import { useSetState } from "@/utils/functions";

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

const CategoryContent = ({
  title,
  commonImage,
  children,
  lists,
  categoryName,
}) => {
  const router = useRouter();
  useEffect(() => {
    filterByCategory();
  }, [categoryName]);

  const [parentCategoryId, setParentCategoryId] = useState("");

  const filterByCategory = async () => {
    const categoryMap = {
      Earrings: "earrings",
      Necklaces: "necklaces",
      bangles__bracelets: "bangles__bracelets",
      finger_rings: "finger_rings",
      Anklets: "anklets",
      Idols: "idols",
      OtherAccessories: "other_accessories",
    };

    const categoryId = categoryMap[categoryName] || ""; // Retrieve the category ID or set to an empty string if not found
    setParentCategoryId(categoryId);
  };

  return (
    <div className="row" style={{ paddingBottom: "30px" }}>
      <div className="col-3" style={{ paddingLeft: "30px" }}>
        <div style={{ paddingLeft: "25px" }}>
          <h6 style={{ paddingBottom: "15px", fontWeight: "500" }}>{title}</h6>
        </div>
        <div>
          <ul style={{ margin: "0px 25px 10px " }}>
            {lists?.slice(0, 12)?.map((item) => {
              return (
                <li
                  style={{
                    cursor: "pointer",
                    borderBottom: "1px solid #e8e3e3",
                    marginBottom: "10px",
                  }}
                  key={item?.node?.slug}
                  onClick={() => {
                    router?.push({
                      pathname: "/shop",
                      query: { category: item?.node?.slug },
                    });
                  }}
                >
                  <a
                    href={`/shop?category=${item?.node?.slug}`}
                    className="cursor-pointer"
                    style={{
                      fontWeight: "500",
                      marginBottom: "0px",
                      color: "gray",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: item?.node?.slug },
                      });
                    }}
                  >
                    {item?.node?.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        {lists?.length > 3 ? (
          <></>
        ) : (
          <div>
            <div>
              {commonImage ? (
                <img
                  // src={commonImage}
                  src="assets/img/blog.webp"
                  alt="category image"
                  style={{ width: "100%", height: "250px" , objectFit:"cover", objectPosition:"center", borderRadius:"10px"}}
                />
              ) : (
                <img
                  src={"/assets/img/earring-menu-pic-1.png"}
                  alt="category image"
                  style={{ width: "100%", height: "250px" }}
                />
              )}
            </div>
            <div style={{ textAlign: "center", padding: "20px 0px" }}>
              <h5 style={{ fontWeight: "400", fontSize:"20px" }}>
                Excepteur sint occaecat
                <br /> cupidatat
              </h5>
              <button
                className="tp-btn tp-btn-border"
                onClick={() => {
                  router?.push({
                    pathname: "/shop",
                    query: { category: parentCategoryId }, // Your parameters
                  });
                }}
                style={{padding:"5px 18px"}}
              >
                Shop Now
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="col-9">
        <div className="row" style={{ padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const CategoryComponent = (props) => {
  const { productList, lastHoveredCategory, productLoading,commonImage } = props;

  const router = useRouter();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  // const [priceFilter, { isLoading: productLoading }] = usePriceFilterMutation();
  const [categoryImage, setCategoryImage] = useState([]);
  const [subCategoryLists, setSubCategoryLists] = useState([]);

  // const [subCatList, { isLoading: loadingProduct }] = useSubCatListMutation();

  const renderContent = () => {
    // if (productList?.length === 0) return null;

    return  productLoading ? (
      <SingleLoader loading={productLoading} />
    ) : productList?.length > 0 ? (
      <Swiper
        {...slider_setting}
        modules={[Pagination]}
        className="tp-category-slider-active-4 swiper-container"
      >
        {productList?.map((item) => (
          <SwiperSlide key={item?.node?.id}>
            <div
              className="col-lg-3 menus-product-list"
              style={{ padding: "0px 8px 0px 0px", width: "250px" }}
            >
              <MenusProductSlider product={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <div
        style={{
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Product Not Found
      </div>
    );
  };

  const renderCategoryContent = () => {
    // if (!currentCategory || !categoryMap[currentCategory]) return null;

    // const { title } = categoryMap[currentCategory];
    return (
      <CategoryContent
        // title={title}
        commonImage={commonImage}
        lists={subCategoryLists}
        categoryName={lastHoveredCategory}
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
      className="col-xl-3 col-lg-3 col-sm-6 d-flex align-items-center"
      style={{ height: "300px" }}
    >
      <Loader loading={loading} />
    </div>
  );
}

const Menus = () => {
  const router = useRouter();

  const [state, setState] = useSetState({
    categoryList: [],
    productList: [],
  });

  const [categoryLists, { loading: loading }] =
    useNobelsetCategoryListMutation();

  const [priceFilter, { isLoading: productLoading }] = usePriceFilterMutation();

  const dispatch = useDispatch();
  const [lastHoveredCategory, setLastHoveredCategory] = useState("Earrings");

  useEffect(() => {
    dispatch(filterData({}));
  }, [router]);

  useEffect(() => {
    categoryList();
  }, []);

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
        console.log("✌️categoryList --->", categoryList);
      }
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const hoverCategoryProduct = async (slug) => {
    setLastHoveredCategory(slug);

    const res = await priceFilter({
      filter: { categorySlugs: slug },
      sortBy: { direction: "DESC", field: "CREATED_AT" },
      first: 12,
      after: null,
    });
    console.log("✌️res --->", res);
    const list = res?.data?.data?.productsSearch?.edges?.slice(0, 11);
    console.log("✌️list --->", list);
    setState({ productList: list });

    // .then((res) => {
    //   console.log("✌️res --->", res);
    //   // const result = list
    //   //   ?.map((item) => item.node?.category)
    //   //   ?.flatMap((subArray) =>
    //   //     subArray.find(
    //   //       (item) =>
    //   //         item.slug === categoryId && item.backgroundImageUrl !== ""
    //   //     )
    //   //   );
    //   // setCategoryImage(result?.[0]?.backgroundImageUrl || commonImage);
    //   // setProductList(list);
    // });
  };

  return (
    <ul style={{ display: "flex" }}>
      <li>
        <Link href="/shop" style={{ fontWeight: "500", color: "black" }}>
          All Jewellery
        </Link>
      </li>

      {/* <li>
        <Link href="/myOrders" style={{ fontWeight: "500", color: "black" }}>
          Collections
        </Link>
      </li> */}
      <li className="has-dropdown has-mega-menu">
        <Link href="/shop" style={{ fontWeight: "500", color: "black" }}>
          Collections
        </Link>
        <div className="home-menu tp-submenu tp-mega-menu">
          <div className="row">
            <div
              className="col-lg-2"
              style={{
                backgroundColor: "#fff",
                padding: "0px",
                color: "black",
              }}
            >
              <ul>
                {state.categoryList?.map((item) => (
                  <li
                    className={`shop-submenu-catageroy-list ${
                      lastHoveredCategory == item?.slug ? "active" : ""
                    }`}
                    onMouseEnter={() => hoverCategoryProduct(item?.slug)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingRight: "10px",
                      borderRadius:"10px"
                    }}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: {
                          category: tem?.slug
                            .toLowerCase()
                            .replace("&", "")
                            .split(" ")
                            .join("-"),
                        },
                      });
                    }}
                  >
                    <a
                      href={`/shop?category=${item?.slug
                        .toLowerCase()
                        .replace("&", "")
                        .split(" ")
                        .join("-")}`}
                      style={{ cursor: "pointer", marginBottom: "0px",textTransform:"capitalize" }}
                      className={`shop-submenu-catageroy-list-a cursor-pointer ${
                        lastHoveredCategory == item?.slug ? "active" : ""
                      }`}
                      onClick={() => {
                        router.push({
                          pathname: "/shop",
                          query: {
                            category: item?.slug
                              .toLowerCase()
                              .replace("&", "")
                              .split(" ")
                              .join("-"),
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
                ))}
                {/* <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Necklaces" ? "active" : ""
                  }`}
                  onMouseEnter={() => setLastHoveredCategory("Necklaces")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { category: "necklaces" },
                    });
                  }}
                >
                  <a
                    href="/shop?category=necklaces"
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "Necklaces" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "necklaces" },
                      });
                    }}
                  >
                    Gifting
                  </a>
                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Necklaces" ? "active" : ""
                    }`}
                  />
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "bangles__bracelets" ? "active" : ""
                  }`}
                  onMouseEnter={() =>
                    setLastHoveredCategory("bangles__bracelets")
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { category: "bangles__bracelets" },
                    });
                  }}
                >
                  <a
                    href="/shop?category=bangles__bracelets"
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "bangles__bracelets"
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "bangles__bracelets" },
                      });
                    }}
                  >
                    Silvers
                  </a>
                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "bangles__bracelets"
                        ? "active"
                        : ""
                    }`}
                  />
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "finger_rings" ? "active" : ""
                  }`}
                  onMouseEnter={() => setLastHoveredCategory("finger_rings")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router.push({
                      pathname: "/shop",
                      query: { category: "finger_rings" },
                    });
                  }}
                >
                  <a
                    href="/shop?category=finger_rings"
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "finger_rings" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "finger_rings" },
                      });
                    }}
                  >
                    Rings
                  </a>

                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "finger_rings" ? "active" : ""
                    }`}
                  />
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Anklets" ? "active" : ""
                  }`}
                  onMouseEnter={() => setLastHoveredCategory("Anklets")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router?.push({
                      pathname: "/shop",
                      query: { category: "anklets" },
                    });
                  }}
                >
                  <a
                    href="/shop?category=anklets"
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "Anklets" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "anklets" },
                      });
                    }}
                  >
                    Anklets
                  </a>
                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Anklets" ? "active" : ""
                    }`}
                  />
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "Idols" ? "active" : ""
                  }`}
                  onMouseEnter={() => setLastHoveredCategory("Idols")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router?.push({
                      pathname: "/shop",
                      query: { category: "idols" },
                    });
                  }}
                >
                  <a
                    href="/shop?category=idols"
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "Idols" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "idols" },
                      });
                    }}
                  >
                    Idols
                  </a>
                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Idols" ? "active" : ""
                    }`}
                  />
                </li>

                <li
                  className={`shop-submenu-catageroy-list ${
                    lastHoveredCategory === "OtherAccessories" ? "active" : ""
                  }`}
                  onMouseEnter={() =>
                    setLastHoveredCategory("OtherAccessories")
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    router?.push({
                      pathname: "/shop",
                      query: { category: "other_accessories" },
                    });
                  }}
                >
                  <a
                    href="/shop?category=other_accessories"
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a cursor-pointer ${
                      lastHoveredCategory === "OtherAccessories" ? "active" : ""
                    }`}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "other_accessories" },
                      });
                    }}
                  >
                    Other Accessories
                  </a>
                  <RightOutlined
                    style={{ cursor: "pointer", marginBottom: "0px" }}
                    className={`shop-submenu-catageroy-list-a ${
                      lastHoveredCategory === "Other Accessories"
                        ? "active"
                        : ""
                    }`}
                  />
                </li> */}
              </ul>
            </div>
            <div className="col-lg-10">
              <div className="tp-mega-menu-item">
                <CategoryComponent
                  commonImage="/assets/img/earring-menu-pic-1.png" // Add the path to your common image
                  lastHoveredCategory={lastHoveredCategory}
                  productList={state.productList}
                  productLoading={productLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </li>

      <li>
        <Link
          href={{
            pathname: "/shop",
            query: { category: "silver" },
          }}
          style={{ fontWeight: "500", color: "black" }}
        >
          Silver
        </Link>
      </li>
      {/* {token && ( */}
      <li>
        <Link href="/gift-card" style={{ fontWeight: "500", color: "black" }}>
          Gifting
        </Link>
      </li>
      {/* )} */}

      {/* <li>
        <Link href="/pre-orders" style={{ fontWeight: "500" }}>
          PRE-ORDERS
        </Link>
      </li>

      <li>
        <Link href="/sale" style={{ fontWeight: "500" }}>
          LOOT SALE
        </Link>
      </li>
      <li>
        <Link href="/about" style={{ fontWeight: "500" }}>
          ABOUT
        </Link>
      </li>
      <li>
        <Link href="/contact" style={{ fontWeight: "500" }}>
          CONTACT US
        </Link>
      </li> */}
    </ul>
  );
};

export default Menus;
