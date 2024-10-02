import React ,{useState,useEffect}from "react";

const UpdatePrice = (
               {  details,
               currency,
               setOpenUpdatePrice,
               UPDATE_TOKEN_PRICE,
              }) => {
 
 const [price,setPrice] = useState()

  

  return(
    <section className="new-margin ico-contact pos-rel">
        <div className="container ">
          <div className="ico-contact__wrap">
            <h2 className="title">Update Token Price<strong onClick={()=>setOpenUpdatePrice(false)}>X</strong></h2>
            
            <div>
            <div className="row">
              <div className="col-lg-12 mb-20">
               
              </div>
              <div className="col-lg-12 mb-20">
              <input
                    type="text"
                    placeholder="_price"
                    onChange={(e)=>setPrice(e.target.value)}
                  />
              </div>

             

              <p>
                <strong>Current Price:</strong>{details?.tokenPrice} {currency} &nbsp; &nbsp;
                <strong>Token Balance:</strong>{details?.tokenBal} {""} {details?.symbol}
              </p>

              <div className="ico-contact__btn text-center mt-10">
                <button className="thm-btn" onClick={()=> UPDATE_TOKEN_PRICE(donateFund)}>
                 Update Price
                </button>
              </div>

              

              
            </div>
          </div>

           
          </div>

          
        </div>
      
    </section>
  )
};

export default UpdatePrice;
