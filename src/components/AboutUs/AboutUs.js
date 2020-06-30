import React, { Fragment } from 'react';
import backrgoundImage from '../../image/typeOfTea4.jpg';
import './AboutUs.scss';
import Grid from '@material-ui/core/Grid';
import Title from '../../common/Title/Title';
import TeaSvg from '../../common/TeaSvg/TeaSvg';

const aboutUs= [
    {
        id:1,
        title:"Crafted by Us, Created for You",
        section:"We combine premium ingredients, years of expertise and thoughtful practice to craft delicious tea blends with layered flavors for your sipping pleasure."
    },
    {
        id:2,
        title:"Premium, Quality Ingredients",
        section:"We strive to use the best premium teas,botanicals and ingredients from regions known for their excellence. We use mint from the Pacific Northwest and rooibos from South Africa,just to name a few. It’s easy to taste the difference in our vibrant flavors."
    },
    {
        id:3,
        title:"Years of Expertise",
        section:" All Tea Pot teas are locally blended in the Seattle area by our tea experts--a team of dedicated artisans inspired by the world around them. Our tea experts cup every ingredient multiple times to ensure quality and consistency. They are on an endless quest to create teas inspired by ancient tea blending traditions and modern culinary trends."
    },

]


function AboutUs(){
    return(
            <div className="aboutUs-Container">
                
                <section className="aboutUs-section1">
                    <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <img src={backrgoundImage} alt="types of Tea" className="aboutUs-Img"/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div className="aboutUs-title">
                                <Title title="About Us" fontsize="30px"/> 
                                <TeaSvg/>
                            </div>
                           
                        <aside className="aboutUs-text">
                            {aboutUs.map((text,index)=>(
                                <Fragment key={index}>
                                <Title title={text.title} fontsize="20px" marginTop="0px"/> 
                                <section>
                                    {text.section}
                                </section>
                                </Fragment>
                            ))}
                            
                        </aside>
                    </Grid>
                    </Grid>
                </section>
             
            </div>
    )
}

export default AboutUs;