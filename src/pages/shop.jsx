import React, { useState, useEffect } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import {
  useGetAllProductsQuery,
  useGetCategoryNameMutation,
  useGetParentCategoryListQuery,
  useGetTagNameMutation,
  usePriceFilterMutation,
  useNewProductListMutation,
  useShopPaginationMutation,
  useAttributeListMutation,
} from "@/redux/features/productApi";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import FooterTwo from "@/layout/footers/footer-2";
import shopBanner from "../../public/assets/img/shop-banner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateCheckoutTokenWithoutEmailMutation,
} from "@/redux/features/card/cardApi";
import {
  filterData,
  handleFilterSidebarClose,
} from "@/redux/features/shop-filter-slice";
import { get_wishlist_products } from "@/redux/features/wishlist-slice";
import { useGetWishlistQuery } from "@/redux/features/productApi";
import { useRouter } from "next/router";
import Pagination from "../pagination/pagination";
import {
  useFilterOptionMutation,
  useMaxPriceMutation,
} from "../redux/features/productApi";

const ShopPage = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const filter = useSelector((state) => state.shopFilter.filterData);

  const [after, setAfter] = useState(null);
  const [before, setBefore] = useState(null);
  const [priceValue, setPriceValue] = useState([0, 0]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [initialMaxPrice, setInitialMaxPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState("");
  const [filterList, setFilterList] = useState([]);

  const [currPage, setCurrPage] = useState(1);

  const [catName, setCatName] = useState("");
  const [parentCatName, setParentCatName] = useState("");
  const [parentSlug, setParentSlug] = useState("");
  const [tagName, setTagName] = useState("");
  const [pageInfo, setPageInfo] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [prevPage, setPrevPage] = useState(1);
  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [productDesigns, setProductDesigns] = useState([]);
  const [productFinishes, setProductFinishes] = useState([]);
  const [productStoneTypes, setProductStoneTypes] = useState([]);
  const [productStyles, setProductStyles] = useState([]);
  const [attributeList, setAttributeList] = useState([]);

  const categoryId = router?.query?.category;

  const PAGE_LIMIT = 21;

  const commonFilter = () => {
    let filters = {};

    if (filter?.price) {
      filters.price = {
        gte: filter?.price?.min ? filter?.price?.min : priceValue[0],
        lte: filter?.price?.max ? filter?.price?.max : priceValue[1],
      };
    }

    if (filter?.attributes) {
      filters = {
        ...filters, // Keep the existing price filter
        attributes: filter?.attributes, // Merge other filters
      };
    }

    if (categoryId) {
      filters.categorySlugs = categoryId;
    }

    if (router?.query?.tag) {
      filters.tag = router?.query?.tag;
    }

    return filters;
  };

  const initialFilter = () => {
    let filters = {};

    if (filter?.price) {
      filters.price = {
        gte: 0,
        lte: maxPrice,
      };
    }

    if (filter?.attributes) {
      filters = {
        ...filters, // Keep the existing price filter
        attributes: filter?.attributes, // Merge other filters
      };
    }

    if (categoryId) {
      filters.categorySlugs = categoryId;
    }

    if (router?.query?.tag) {
      filters.tag = router?.query?.tag;
    }
    return filters;
  };

  const {
    data: productsData,
    isLoading: productLoadings,
    refetch: productListRefetch,
    error: isError,
  } = useGetAllProductsQuery({
    sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    first: PAGE_LIMIT,
    after: after,
    before: before,
    filter: commonFilter(),
  });

  const { data: categoryData } = useGetParentCategoryListQuery();

  const [priceFilter, { isLoading: filterLoading }] = usePriceFilterMutation();

  const [maximumPrice] = useMaxPriceMutation();

  const [shopPagination, { isLoading: shopPaginationLoading }] =
    useShopPaginationMutation();

  const { data: wishlistData } = useGetWishlistQuery();

  const [newProductList, { isLoading: productPagiLoading }] =
    useNewProductListMutation();

  const [getCategoryName, { isLoading: categoryLoading }] =
    useGetCategoryNameMutation();

  const [getTagName] = useGetTagNameMutation();

  const [filterOptions] = useFilterOptionMutation();

  const [createCheckoutTokenWithoutEmail] =
    useCreateCheckoutTokenWithoutEmailMutation();

  const [attributeLists] = useAttributeListMutation();

  let products = productsData?.data?.productsSearch?.edges;

  const { tag } = router?.query || {};

  let shopTitle = "Shop";

  if (categoryId) {
    shopTitle = `Shop / ${
      parentCatName ? `${parentCatName} / ` : ""
    }${catName}`;
  } else if (tag) {
    shopTitle = `Shop / ${tagName}`;
  }

  // useEffect(() => {
  //   getAttributeList();
  // }, []);

  // const getAttributeList = async () => {
  //   try {
  //     const res = await attributeLists();
  //     console.log("res: ", res);
  //     const data = res?.data?.data?.attributes?.edges?.map(
  //       (item) => item?.node
  //     );
  //     setAttributeList(data);
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };

  useEffect(() => {
    if (wishlistData) {
      if (wishlistData?.data?.wishlists?.edges?.length > 0) {
        const modify = wishlistData?.data?.wishlists.edges;
        dispatch(get_wishlist_products(modify?.map((item) => item.node)));
      } else {
        dispatch(get_wishlist_products([]));
      }
    } else {
      dispatch(get_wishlist_products([]));
    }
  }, [wishlistData]);

  useEffect(() => {
    const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
    const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");

    if (!checkoutTokenINR || checkoutTokenINR == "undefined") {
      createCheckoutTokenINR();
    }
    if (!checkoutTokenUSD || checkoutTokenUSD == "undefined") {
      createCheckoutTokenUSD();
    }
  }, []);

  useEffect(() => {
    if (categoryId) {
      filterByCategoryName();
    }
  }, [router]);

  useEffect(() => {
    if (router?.query?.tag) {
      filterByTagName();
    }
  }, [router]);

  useEffect(() => {
    getProductMaxPrice();
    filterOption();
  }, [router]);

  useEffect(() => {
    setCurrentPage(1);
  }, [totalCount]);

  useEffect(() => {
    if (router?.asPath === "/shop") {
      productLists();
    }
  }, [productsData, router]);

  useEffect(() => {
    getCategoryList();
  }, [categoryData]);

  // useEffect(() => {
  //   console.log("filter: ", filter);

  //   if (filter) {
  //     filters();
  //   } else {
  //     if (categoryId) {
  //       filterByCategory();
  //     } else if (router?.query?.tag) {
  //       filterByTags();
  //     } else {
  //       productLists();
  //     }
  //     filterOption();
  //   }
  // }, [filter]);

  useEffect(() => {
    if (filter) {
      filters();
    }
  }, [filter]);

  useEffect(() => {
    dispatch(filterData({}));
  }, [router]);

  useEffect(() => {
    if (categoryId) {
      filterByCategory();
    }
  }, [router]);

  useEffect(() => {
    if (router?.query?.tag) {
      filterByTags();
    }
  }, [router]);

  const createCheckoutTokenINR = async () => {
    try {
      const data = await createCheckoutTokenWithoutEmail({
        channel: "india-channel",
      });
      localStorage.setItem(
        "checkoutTokenINR",
        data?.data?.data?.checkoutCreate?.checkout?.token
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createCheckoutTokenUSD = async () => {
    try {
      const data = await createCheckoutTokenWithoutEmail({
        channel: "default-channel",
      });
      localStorage.setItem(
        "checkoutTokenUSD",
        data?.data?.data?.checkoutCreate?.checkout?.token
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const productLists = () => {
    if (
      productsData &&
      productsData?.data &&
      productsData?.data?.productsSearch &&
      productsData?.data?.productsSearch?.edges?.length > 0
    ) {
      const data = productsData?.data?.productsSearch;
      const list = data?.edges;
      setProductList(list);
      setStartCursor(data?.pageInfo?.startCursor);
      setEndCursor(data?.pageInfo?.endCursor);
      setIsPrev(data?.pageInfo?.hasPreviousPage);
      const totalPages = Math.ceil(data?.totalCount / PAGE_LIMIT);
      setTotalPages(totalPages);
      setTotalCount(data?.totalCount);
    }
  };

  const getProductMaxPrice = () => {
    const filter = commonFilter();
    maximumPrice({
      filter,
      first: 1,
      sortBy: { direction: "DESC", field: "PRICE" },
    }).then((res) => {
      const list = res.data?.data?.productsSearch?.edges;
      if (list?.length > 0) {
        const maxPrice =
          list[0]?.node?.pricing?.priceRange?.start?.gross?.amount;
        setPriceValue([0, maxPrice]);
        setInitialMaxPrice(maxPrice);
        setMaxPrice(maxPrice);
      } else {
        setPriceValue([0, 0]);
        setMaxPrice(0);
      }
    });
  };

  const getCategoryList = () => {
    if (
      categoryData &&
      categoryData?.data &&
      categoryData?.data?.categories &&
      categoryData?.data?.categories?.edges
    ) {
      const catList = categoryData?.data?.categories?.edges;

      const CategoriesList = catList.filter((item) => {
        return (
          item.node.name !== "Hidden" &&
          item.node.productsWithoutHiddenCategory?.totalCount > 0
        );
      });
      const lastTen = CategoriesList?.slice(0, 8);

      setCategoryList(lastTen);
    }
  };

  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  const selectHandleFilter = async (e) => {
    try {
      let sortBy = {};
      if (e.value == "Default Sorting") {
        sortBy = { direction: "ASC", field: "ORDER_NO" };
      }
      if (e.value == "Low to High") {
        sortBy = { direction: "ASC", field: "PRICE" };
      }
      if (e.value == "High to Low") {
        sortBy = { direction: "DESC", field: "PRICE" };
      }
      if (e.value == "New Added") {
        sortBy = { direction: "DESC", field: "CREATED_AT" };
      }
      setSortBy(sortBy);
      finalInitialFilterData(sortBy);
      setCurrentPage(1);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const otherProps = {
    priceFilterValues: {
      priceValue,
      handleChanges,
    },
    selectHandleFilter,
    currPage,
    setCurrPage,
  };

  const filterByCategory = () => {
    const datas = {
      categorySlugs: categoryId,
    };

    priceFilter({
      filter: datas,
      first: PAGE_LIMIT,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    }).then((res) => {
      const data = res?.data?.data?.productsSearch;
      setCursorAndList(res);
      const totalPages = Math.ceil(data?.totalCount / PAGE_LIMIT);
      setTotalPages(totalPages);
      setTotalCount(data?.totalCount);
    });
  };

  const filterByTags = () => {
    const datas = {
      tag: router?.query?.tag,
    };

    priceFilter({
      filter: datas,
      first: PAGE_LIMIT,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    }).then((res) => {
      const data = res?.data?.data?.productsSearch;
      setCursorAndList(res);
      const totalPages = Math.ceil(data?.totalCount / PAGE_LIMIT);
      setTotalPages(totalPages);
      setTotalCount(data?.totalCount);
    });
  };

  const filters = () => {
    let filters = {};
    if (filter?.price) {
      filters.price = {
        gte: filter?.price?.min ? filter?.price?.min : priceValue[0],
        lte: filter?.price?.max ? filter?.price?.max : priceValue[1],
      };
    }

    if (filter?.attributes) {
      filters = {
        ...filters, // Keep the existing price filter
        attributes: filter?.attributes, // Merge other filters
      };
    }

    if (categoryId) {
      filters.categorySlugs = categoryId;
    }

    if (router?.query?.tag) {
      filters.tag = router?.query?.tag;
    }
    priceFilter({
      filter: filters,
      first: PAGE_LIMIT,
      sortBy: sortBy ? sortBy : { direction: "DESC", field: "CREATED_AT" },
    }).then((res) => {
      const data = res?.data?.data?.productsSearch;
      setCursorAndList(res);
      const totalPages = Math.ceil(data?.totalCount / PAGE_LIMIT);
      setTotalPages(totalPages);
      setTotalCount(data?.totalCount);
      setCursorAndList(res);
      dispatch(handleFilterSidebarClose());
    });

    filterOptions({
      filter: filters,
    }).then((res) => {
      finalFilterOptionList(res);
    });

    // }
  };

  const filterByPrice = () => {
    const bodyData = {
      price: { gte: priceValue[0], lte: priceValue[1] },
    };
    if (categoryId) {
      bodyData.categorySlugs = categoryId;
    }
    if (router?.query?.tag) {
      bodyData.tag = router?.query?.tag;
    }

    priceFilter({
      filter: bodyData,
      first: PAGE_LIMIT,
      after: null,
      sortBy: { direction: "DESC", field: "CREATED_AT" },
    }).then((res) => {
      const data = res?.data?.data?.productsSearch;
      setCursorAndList(res);
      const totalPages = Math.ceil(data?.totalCount / PAGE_LIMIT);
      setTotalPages(totalPages);
      setTotalCount(data?.totalCount);

      const price = {
        min: priceValue[0],
        max: priceValue[1],
      };

      let filteredList = { ...filter, price };

      // if (type === "priceRange") {
      //   filteredList = filter?.filter((item) => item.type !== "price");
      // }

      // const listd = [...filteredList, body];
      dispatch(filterData(filteredList));
      setPriceValue([priceValue[0], priceValue[1]]);
      setFilterList([...filterList, price]);
      dispatch(handleFilterSidebarClose());
    });

    filterOptions({
      filter: bodyData,
    }).then((res) => {
      finalFilterOptionList(res);
    });
  };

  const filterByCategoryName = async () => {
    try {
      const res = await getCategoryName({
        slug: categoryId,
      });
      const list = res?.data?.data?.category?.name;
      setCatName(list);

      if (res?.data?.data?.category?.parent?.name) {
        setParentCatName(res?.data?.data?.category?.parent?.name);
        setParentSlug(res?.data?.data?.category?.parent?.slug);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filterByTagName = async () => {
    try {
      const res = await getTagName({
        id: router?.query?.tag,
      });
      const list = res?.data?.data?.tagById?.name;
      setTagName(list);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (number) => {
    if (prevPage === null) {
      setPrevPage(currentPage);
    } else {
      if (number === prevPage + 1) {
        if (categoryId || router?.query?.tag || filter) {
          filterNextData();
        } else {
          finalNextData();
        }
      } else if (number === prevPage - 1) {
        if (categoryId || router?.query?.tag || filter) {
          filterPrevData();
        } else {
          finalPrevData();
        }
      } else {
        if (number == 1) {
          if (categoryId || router?.query?.tag || filter) {
            finalInitialFilterData(sortBy);
          } else {
            finalInitialData(sortBy);
          }
        } else {
          finalDynamicPaginationData(number);
        }
      }
    }
    setPrevPage(number);
    setCurrentPage(number);
    return number;
  };
  // --------------------------SHOP --------------------------------------

  const finalNextData = async () => {
    const res = await newProductList({
      first: PAGE_LIMIT,
      after: endCursor,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
      filter: commonFilter(),
    });
    setCursorAndList(res);
  };

  const finalPrevData = async () => {
    const res = await newProductList({
      last: PAGE_LIMIT,
      before: startCursor,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
      filter: commonFilter(),
    });
    setCursorAndList(res);
  };

  const dynamicPageData = async (endCursor) => {
    const res = await newProductList({
      first: PAGE_LIMIT,
      after: endCursor,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
      filter: commonFilter(),
    });
    setCursorAndList(res);
  };

  const finalInitialData = async (sortBy) => {
    let body = {
      first: PAGE_LIMIT,
      after: null,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
      filter: commonFilter(),
    };
    const res = await newProductList(body);
    setCursorAndList(res);
  };

  const refresh = async (sortBy) => {
    let body = {
      first: PAGE_LIMIT,
      after: null,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
      filter: {},
    };
    const res = await newProductList(body);
    setCursorAndList(res);
  };
  // --------------------------SHOP --------------------------------------

  const finalDynamicPaginationData = async (number) => {
    const filter = commonFilter();
    const res = await shopPagination({
      before: null,
      first: PAGE_LIMIT,
      after: null,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
      page: number,
      filter,
    });

    const data = res?.data?.data?.findProductsEndcursor;
    if (categoryId || router?.query?.tag || filter) {
      dynamicFilterPageData(data?.pageInfo?.endCursor);
    } else {
      dynamicPageData(data?.pageInfo?.endCursor);
    }
  };

  // --------------------------CATEGORY FILTER --------------------------------------

  const filterNextData = async () => {
    const datas = commonFilter();
    const res = await priceFilter({
      filter: datas,
      first: PAGE_LIMIT,
      after: endCursor,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    });
    setCursorAndList(res);
    const response = await filterOptions({
      filter: datas,
    });

    finalFilterOptionList(response);
  };

  const filterPrevData = async () => {
    const datas = commonFilter();
    const res = await priceFilter({
      filter: datas,
      last: PAGE_LIMIT,
      before: startCursor,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    });
    setCursorAndList(res);
    const response = await filterOptions({
      filter: datas,
    });

    finalFilterOptionList(response);
  };

  const dynamicFilterPageData = async (endCursor) => {
    const datas = commonFilter();
    priceFilter({
      filter: datas,
      first: PAGE_LIMIT,
      after: endCursor,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    }).then((res) => {
      const data = res?.data?.data?.productsSearch;
      setCursorAndList(res);
      const totalPages = Math.ceil(data?.totalCount / PAGE_LIMIT);
      setTotalPages(totalPages);
      setTotalCount(data?.totalCount);
    });
    const res = await filterOptions({
      filter: datas,
    });

    finalFilterOptionList(res);
  };

  const finalInitialFilterData = async (sortBy) => {
    const datas = commonFilter();
    priceFilter({
      filter: datas,
      first: PAGE_LIMIT,
      after: null,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    }).then((res) => {
      setCursorAndList(res);
    });
    const res = await filterOptions({
      filter: datas,
    });

    finalFilterOptionList(res);
  };

  const refreshFilterData = async (sortBy) => {
    const datas = initialFilter();
    priceFilter({
      filter: datas,
      first: PAGE_LIMIT,
      after: null,
      sortBy: sortBy || { direction: "DESC", field: "CREATED_AT" },
    }).then((res) => {
      setCursorAndList(res);
    });
    const res = await filterOptions({
      filter: datas,
    });

    finalFilterOptionList(res);
  };
  // --------------------------CATEGORY FILTER --------------------------------------

  const setCursorAndList = (res) => {
    const data = res?.data?.data?.productsSearch;
    const list = data?.edges;
    setProductList(list);
    setStartCursor(data?.pageInfo?.startCursor);
    setEndCursor(data?.pageInfo?.endCursor);
    setIsNext(data?.pageInfo?.hasNextPage);
    setIsPrev(data?.pageInfo?.hasPreviousPage);
    const totalPages = Math.ceil(data?.totalCount / PAGE_LIMIT);
    setTotalPages(totalPages);
    setTotalCount(data?.totalCount);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filterOption = async () => {
    try {
      const datas = commonFilter();

      const res = await filterOptions({
        filter: datas,
      });

      finalFilterOptionList(res);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const finalFilterOptionList = (res) => {
    let parsedFilterData;
    if (res?.data?.data?.attributefilter?.filterData) {
      parsedFilterData = JSON?.parse(
        res?.data?.data?.attributefilter?.filterData
      );
    }
    if (parsedFilterData?.edges?.length > 0) {
      setAttributeList(parsedFilterData?.edges?.map((item) => item.node));
    } else {
      setAttributeList([]);
    }
    // setProductDesigns(data?.productDesigns);
    // setProductFinishes(data?.productFinishes);
    // setProductStoneTypes(data?.productStoneTypes);
    // setProductStyles(data?.productStyles);
  };

  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb
        title={shopTitle}
        parentSlug={parentSlug}
        // title="Shop"
        subtitle="Shop"
        bgImage={shopBanner}
        catList={categoryList}
        product={productList}
      />
      {/* {isLoading || categoryLoading || filterLoading ? (
        <ShopLoader loading={isLoading} />
      ) : (
        <> */}
      <ShopArea
        all_products={productList}
        products={productList}
        otherProps={otherProps}
        parentSlug={parentSlug}
        productLoading={
          productLoadings ||
          productPagiLoading ||
          filterLoading ||
          shopPaginationLoading
        }
        updateData={() => {}}
        subtitle={shopTitle}
        updateRange={(range) => handleChanges(range)}
        maxPrice={maxPrice}
        totalCount={totalCount}
        page={currentPage}
        clearFilter={() => {
          if (categoryId || router?.query?.tag) {
            refreshFilterData(sortBy);
          } else {
            refresh();
          }
          dispatch(filterData({}));
          setPriceValue([0, initialMaxPrice]);
          setInitialMaxPrice(initialMaxPrice);
          dispatch(handleFilterSidebarClose());
          filterOption();
        }}
      />
      {productList?.length > 0 &&
        !productLoadings &&
        !productPagiLoading &&
        !filterLoading &&
        !shopPaginationLoading && (
          <div>
            <div
              className="mb-20 "
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                activeNumber={handlePageChange}
                totalPages={totalPages}
                currentPages={currentPage}
              />
            </div>
          </div>
        )}

      <ShopFilterOffCanvas
        all_products={products}
        otherProps={otherProps}
        filterByPrice={(val) => filterByPrice("priceRange")}
        maxPrice={maxPrice}
        resetFilter={() => {
          if (categoryId || router?.query?.tag) {
            refreshFilterData(sortBy);
          } else {
            refresh();
          }
          dispatch(filterData({}));
          setPriceValue([0, initialMaxPrice]);
          setInitialMaxPrice(initialMaxPrice);
          dispatch(handleFilterSidebarClose());
          filterOption();
        }}
        design={productDesigns}
        finish={productFinishes}
        stoneType={productStoneTypes}
        style={productStyles}
        attributeList={attributeList}
      />
      <FooterTwo primary_style={true} />
      {/* </>
      )} */}
    </Wrapper>
  );
};

export default ShopPage;

export const getServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};
