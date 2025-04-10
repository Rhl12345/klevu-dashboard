import * as Yup from "yup";

const socialMediaLinksValidation = Yup.object().shape({
  facebookLink: Yup.string()
    .required("Facebook link is required"),
    // .url("Please enter a valid URL"),
  twitterLink: Yup.string()
    .required("Twitter link is required"),

  pinterestLink: Yup.string()
    .required("Pinterest link is required"),

  instagramLink: Yup.string()
    .required("Instagram link is required"),

  linkedinLink: Yup.string()
    .required("LinkedIn link is required"),

  youtubeLink: Yup.string()
    .required("YouTube link is required"),
    
});

export default socialMediaLinksValidation;
