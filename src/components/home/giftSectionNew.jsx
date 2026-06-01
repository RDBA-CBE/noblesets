import { useGetChildCatByParentIdMutation } from "@/redux/features/productApi";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function GiftSectionNew() {

    const [subCatList, { isLoading: productLoading }] = useGetChildCatByParentIdMutation();
    const [giftCategories, setGiftCategories] = useState([]);

  const router = useRouter()

   useEffect(() => {
      categoryList();
    }, []);
  
  
    const categoryList = async () => {
      const res = await subCatList({slug:"gifting-special"});
      const children = res?.data?.data?.category?.children?.edges || [];
      setGiftCategories(children.map((e) => e.node));
    };

    console.log("giftCategories", giftCategories);

  return ( 
    <section class="pt-60 giftSection position-relative" 
    // style={{ backgroundColor: "#f6e9d9" }}
    >
      <div class=" section-wd gift-section">
        <div class="row align-items-center justify-content-center g-5 px-3">
          <div class="col-12 col-lg-6 px-0 px-sm-3 px-lg-5 gift-section-le" data-aos="fade-right">
            <div className="">
              <h5 className="sub-ti ps-1" > <b className="pe-2">✦</b> Thoughtful moments</h5>
              <h4
                className="feature-adipisicing main-ti mb-4 mt-1"
                
              >
                Make Gifting Special
              </h4>
            </div>

            <p class="text sub-ti text-black mb-3 mb-lg-5">
            At Noble Sets, we believe gifting is an art; hence, every piece we craft is a story waiting to
be told. Our curated gifting collection caters to every emotion, relationship and occasion.
            </p>

            <div class="row  gap-0  gap-sm-0   pt-0 pt-lg-2 ">
              {productLoading ? (
                <div class="col-12 text-center"><span>Loading...</span></div>
              ) : giftCategories?.slice(0, 3)?.map((cat, i) => (
                <div key={cat.id} class="col-4 col-sm-4 p-1 text-center cursor-pointer" data-aos="zoom-in" data-aos-delay={200 + i * 100}
                  onClick={() => router.push(`/shop?category=${cat.slug}`)}>
                  <div className="position-relative">
                    <img src={cat.backgroundImageUrl} alt={cat.name} className="w-100" style={{ borderRadius: '10px' }} />
                    <span className="gift-batch position-absolute bottom-0 start-50 translate-middle-x mb-2 d-inline-block rounded-pill px-1 px-sm-2 px-xl-3 shadow-sm fs-12 fs-sm-14" style={{ border: "1px solid #be978b", color: "#571806",whiteSpace: "nowrap", zIndex: 1, backgroundColor: "#ffffffb8" }}>
                      {cat.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="justify-content-center justify-content-md-start"
              style={{
                display: "flex",
                paddingTop: "30px",
              }}
            >
              <button className="gradient-btn" onClick={() => {
                  
                  router.push(`/shop?category=gifting-special`)
                  }}>✦ Explore Products ✦</button>
            </div>
          </div>

          <div class="col-12 col-lg-5 text-center gift-section-ri" data-aos="fade-left">
           <div
  className="position-relative d-lg-flex justify-content-lg-end ps-lg-5 p-3"
>
              <img
                src="/assets/img/newlayout/Making gifiting special/bg.png"
                alt="image-1"
                // style={{
                //   width: "90%",
                //   height: "auto",
                //   // borderRadius: "50% / 40%", 
                //   objectFit: "cover",
                //   cursor: "pointer",
                // }}
                onClick={() => router?.push("/sale")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
