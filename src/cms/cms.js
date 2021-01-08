import CMS from "netlify-cms-app";
import uploadcare from "netlify-cms-media-library-uploadcare";
import cloudinary from "netlify-cms-media-library-cloudinary";

import AboutPagePreview from "./preview-templates/AboutPagePreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import SolutionsPostPreview from "./preview-templates/SolutionsPostPreview";
import CaseStudyPreview from "./preview-templates/CaseStudyPreview";
import ServicePreview from "./preview-templates/ServicePreview";
import IndustriesPreview from "./preview-templates/IndustryPreview";
// import { YoutubeLink } from "./editor-components/youtubeLink";
import ResourcesLibraryReview from "./preview-templates/ResourcesLibraryReview";
import ResourcesEventsReview from "./preview-templates/ResourcesEventsReview";
import ResourcesCaseStudiesPreview from "./preview-templates/ResourcesCaseStudiesPreview";

// CMS.registerEditorComponent(YoutubeLink);
CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);
CMS.registerPreviewTemplate("solutions", SolutionsPostPreview);
CMS.registerPreviewTemplate("services", ServicePreview);
CMS.registerPreviewTemplate("industries", IndustriesPreview);
CMS.registerPreviewTemplate("case-study", CaseStudyPreview);
CMS.registerPreviewTemplate("resources-library", ResourcesLibraryReview);
CMS.registerPreviewTemplate("resources-events", ResourcesEventsReview);
CMS.registerPreviewTemplate(
  "resources-case-studies",
  ResourcesCaseStudiesPreview
);
