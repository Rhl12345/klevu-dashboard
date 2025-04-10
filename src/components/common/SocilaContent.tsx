import React from "react";
import UploadImage from "@/components/UploadImage/UploadImage";
import { OG_TAGS_FIELD_CONSTRAINS } from "@/utils/constants";
import { Label } from "@/components/Label/Label";
import Input from "@/components/Input/Input";
import { Textarea } from "@/components/Textarea/Textarea";
import Tooltip from "@/components/Tooltip/Tooltip";
import Image from "@/components/Image/Image";
import SvgIcon from "@/components/SvgIcons/SvgIcon";

const SocialTagForm = (props: {
  handleOpenGraphImage: (file: File) => void;
  handlePinterestImage: (file: File) => void;
  values: any;
  errors: any;
}) => {
  const { handleOpenGraphImage, handlePinterestImage, values, errors } = props;
  return (
    <>
      {/* Open Graph */}
      <div className="w-full content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 lg:gap-6 font-semibold text-secondary-dark dark:text-secondary-light">
          <div className="flex items-center justify-between">
            <Label size="large">Open Graph</Label>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="col-span-2 md:col-span-1">
              <UploadImage
                key="open_graph_file_upload"
                onUpload={(files) => handleOpenGraphImage(files?.[0])}
                id="open_graph_file_upload"
                initialImages={
                  values.social.ogTags.url ? [values.social.ogTags.url] : []
                }
                errorMessage={errors.social?.ogTags?.image}
              />
            </div>

            <div className="flex flex-col gap-4 lg:gap-6 col-span-2 md:col-span-1">
              <Input
                name="social.ogTags.title"
                label={
                  <div className=" flex flex-col gap-1 sm:flex-row justify-between w-full">
                    <div className="flex">
                      Open Graph Title
                      <Tooltip id="openGraphTitle">
                        <p>
                          1 to {OG_TAGS_FIELD_CONSTRAINS.title} Characters =
                          GREEN,
                        </p>
                        <p> 0 Character = RED</p>
                      </Tooltip>
                    </div>
                    <div className="flex sm:justify-end justify-start">
                      <span className="text-xs">
                        <span>{values.social.ogTags.title?.length}</span> /{" "}
                        <span>{OG_TAGS_FIELD_CONSTRAINS.title}</span> Character
                      </span>
                    </div>
                  </div>
                }
                labelClassName="flex justify-between w-full"
                maxLength={OG_TAGS_FIELD_CONSTRAINS.title}
              />
              <Textarea
                name="social.ogTags.description"
                isFormikField
                rows={2}
                maxLength={OG_TAGS_FIELD_CONSTRAINS.description}
                labelClassName="flex justify-between w-full"
                label={
                  <>
                    <div className=" flex flex-col gap-1 sm:flex-row justify-between w-full">
                      <div className="flex">
                        Open Graph Description
                        <Tooltip id="openGraphTitle">
                          <p>120 to 155 Characters = GREEN,</p>
                          <p> Less than 120 Characters = YELLOW,</p>
                          <p> 0 Character = RED</p>
                        </Tooltip>
                      </div>
                      <div className="flex sm:justify-end justify-start">
                        <span className="text-xs">
                          <span>
                            {values.social.ogTags.description?.length}
                          </span>{" "}
                          / <span>{OG_TAGS_FIELD_CONSTRAINS.description}</span>{" "}
                          Character
                        </span>
                      </div>
                    </div>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Open Graph Preview */}
      <div className="w-full content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 lg:gap-6 font-semibold text-secondary-dark dark:text-secondary-light">
          <div className="flex items-center justify-between">
            <Label size="large">Open Graph Preview</Label>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="flex flex-col gap-4 lg:gap-6  pt-4 items-center col-span-2 md:col-span-1 border border-gray-light dark:border-gray-dark">
              <SvgIcon
                name="Facebook"
                className="w-10 h-10 text-primary-light dark:text-primary-dark"
              />
              <div className="w-52 h-52">
                <Image
                  src={values.social.facebook.url || "/noImage.png"}
                  alt="Open Graph facebook Preview"
                  width={200}
                  height={200}
                  className="w-full h-full"
                  variant="next"
                  objectFit="contain"
                />
              </div>
              <div className="text-base w-full bg-gray-pointer/60 p-4 flex flex-col gap-2 min-h-28">
                <div className="text-md font-bold text-primary-light dark:text-primary-dark">
                  {values.social.facebook.title}
                </div>
                <div className="text-sm text-primary-light/80 dark:text-primary-dark/80 break-words">
                  {values.social.facebook.description}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:gap-6  pt-4 items-center col-span-2 md:col-span-1 border border-gray-light dark:border-gray-dark">
              <SvgIcon
                name="Twitter"
                className="w-10 h-10 text-primary-light dark:text-primary-dark"
              />
              <div className="w-52 h-52">
                <Image
                  src={values.social.twitter.url || "/noImage.png"}
                  alt="Open Graph twitter Preview"
                  width={200}
                  height={200}
                  className="w-full h-full "
                  variant="next"
                  objectFit="contain"
                />
              </div>
              <div className="text-base w-full bg-gray-pointer/60 p-4 flex flex-col gap-2 min-h-28">
                <div className="text-md font-bold text-primary-light dark:text-primary-dark">
                  {values.social.twitter.title}
                </div>
                <div className="text-sm text-primary-light/80 dark:text-primary-dark/80 break-words">
                  {values.social.twitter.description}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:gap-6  pt-4 items-center col-span-2 md:col-span-1 border border-gray-light dark:border-gray-dark">
              <SvgIcon
                name="LinkedIn"
                className="w-10 h-10  text-primary-light dark:text-primary-dark"
              />
              <div className="w-52 h-52">
                <Image
                  src={values.social.linkedin.url || "/noImage.png"}
                  alt="Open Graph LinkedIn Preview"
                  width={200}
                  height={200}
                  className="w-full h-full"
                  variant="next"
                  objectFit="contain"
                />
              </div>
              <div className="text-base w-full bg-gray-pointer/60 p-4 flex flex-col gap-2 min-h-28">
                <div className="text-md font-bold text-primary-light dark:text-primary-dark">
                  {values.social.linkedin.title}
                </div>
                <div className="text-sm text-primary-light/80 dark:text-primary-dark/80 break-words">
                  {values.social.linkedin.description}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:gap-6  pt-4 items-center col-span-2 md:col-span-1 border border-gray-light dark:border-gray-dark">
              <SvgIcon
                name="Pinterest"
                className="w-10 h-10  text-primary-light dark:text-primary-dark"
              />
              <div className="w-52 h-52">
                <Image
                  src={values.social.pinterest.url || "/noImage.png"}
                  alt="Open Graph Pinterest Preview"
                  width={200}
                  height={200}
                  className="w-full h-full"
                  variant="next"
                  objectFit="contain"
                />
              </div>
              <div className="text-base w-full bg-gray-pointer/60 p-4 flex flex-col gap-2 min-h-28">
                <div className="text-md font-bold text-primary-light dark:text-primary-dark">
                  {values.social.pinterest.title}
                </div>
                <div className="text-sm text-primary-light/80 dark:text-primary-dark/80 break-words">
                  {values.social.pinterest.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-2 font-semibold text-secondary-dark dark:text-secondary-light">
          <div className="flex items-center justify-between  mb-2">
            <Label size="large">Pinterest Open Graph</Label>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="col-span-2 md:col-span-1">
              <UploadImage
                id="pintrest_file_upload"
                key="pintrest_file_upload"
                onUpload={(files) => handlePinterestImage(files?.[0])}
                initialImages={
                  values.social.pinterest.url
                    ? [values.social.pinterest.url]
                    : []
                }
                errorMessage={errors.social?.pinterest?.image}
              />
            </div>

            <div className="flex flex-col gap-4 lg:gap-6 col-span-2 md:col-span-1">
              <Input
                name="social.pinterest.title"
                label={
                  <>
                    <div className=" flex flex-col gap-1 sm:flex-row justify-between w-full">
                      <div className="flex">
                        Open Graph Title
                        <Tooltip id="openGraphTitle">
                          <p>
                            1 to {OG_TAGS_FIELD_CONSTRAINS.title} Characters =
                            GREEN,
                          </p>
                          <p> 0 Character = RED</p>
                        </Tooltip>
                      </div>
                      <div className="flex sm:justify-end justify-start">
                        <span className="text-xs">
                          <span>{values.social.pinterest.title?.length}</span> /{" "}
                          <span>{OG_TAGS_FIELD_CONSTRAINS.title}</span>{" "}
                          Character
                        </span>
                      </div>
                    </div>
                  </>
                }
                labelClassName="flex justify-between w-full"
                maxLength={OG_TAGS_FIELD_CONSTRAINS.title}
              />
              <Textarea
                name="social.pinterest.description"
                isFormikField
                rows={2}
                maxLength={OG_TAGS_FIELD_CONSTRAINS.description}
                labelClassName="flex justify-between w-full"
                label={
                  <>
                    <div className=" flex flex-col gap-1 sm:flex-row justify-between w-full">
                      <div className="flex">
                        Open Graph Description
                        <Tooltip id="openGraphTitle">
                          <p>120 to 155 Characters = GREEN,</p>
                          <p> Less than 120 Characters = YELLOW,</p>
                          <p> 0 Character = RED</p>
                        </Tooltip>
                      </div>
                      <div className="flex sm:justify-end justify-start">
                        <span className="text-xs">
                          <span>
                            {values.social.pinterest.description?.length}
                          </span>{" "}
                          / <span>{OG_TAGS_FIELD_CONSTRAINS.description}</span>{" "}
                          Character
                        </span>
                      </div>
                    </div>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialTagForm;
