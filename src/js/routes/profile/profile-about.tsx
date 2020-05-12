import React from "react";
import {ProfileResponse} from "../../api/profile";


const ProfileAbout = ({about, city, country, twitterLink, instagramLink, facebookLink}: ProfileResponse) => {
    return <aside className="profile-about">
        <section>
            {about ? <div>
                <h5>About me</h5>
                <article>{about}</article>
            </div> : null}
            {city || country ? <div>
                <hr/>
                <h5>My location</h5>
                <article>{city ? city : null}{city && country ? ", " : null}{country ? country : null}</article>
            </div> : null}
            {twitterLink || facebookLink || instagramLink ? <div>
                <hr/>
                <h5>Connect with me</h5>
                <div className="d-flex mt-2">
                    <SocialLink link={twitterLink} type="twitter" icon="fab fa-2x fa-twitter"/>
                    <SocialLink link={facebookLink} type="facebook" icon="fab fa-facebook fa-2x"/>
                    <SocialLink link={instagramLink} type="instagram" icon="fab fa-2x fa-instagram"/>
                </div>
            </div> : null}
        </section>
    </aside>;
};

interface SocialLinkProps {
    link: string | null;
    type: string;
    icon: string;
}

const SocialLink = ({link, type, icon}: SocialLinkProps) => {
    if (link)
        return <a className="text-black-hover" href={link}>
            <div className={`social-link ${type}`}>
                <span className={icon}/>
            </div>
        </a>;
    return null;
};

export default ProfileAbout;