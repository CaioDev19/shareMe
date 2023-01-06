import * as Sc from "./style"
import { Input } from "../../components/Form/Input"
import { Text } from "../../global/styles/Typography"
import { Select } from "../../components/Form/Select"
import { useCategories } from "../../hooks/react-query/query/useCategories"
import { IoCloudUploadOutline } from "react-icons/io5"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postSchema } from "../../utils/validators/postSchema"
import { Category } from "../../services/api"
import { NewPost } from "../../utils/validators/postSchema"
import { useState } from "react"
import { useCreatePost } from "../../hooks/react-query/mutation/useCreatePost"
import Spinner from "react-bootstrap/Spinner"
import { UserInfo } from "../../components/UserInfo"
import { useLoggedUser } from "../../hooks/useLoggedUser"
import { MouseEvent } from "react"
import { TrashCan } from "../../components/Feed/Post/TrashCan"

export function CreatePost() {
  const { user } = useLoggedUser()
  const [imageBackground, setimageBackground] = useState<string>("")
  const [isImageBeingUploaded, setIsImageBeingUploaded] =
    useState<boolean>(false)
  const [isFileError, setIsFileError] = useState<boolean>(false)
  const { data: categories, isSuccess } = useCategories()
  const {
    handleSubmit,
    control,
    watch,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: [],
    } as NewPost,
  })
  const { mutate, isLoading } = useCreatePost()

  function handleData(data: NewPost) {
    const { id: categoryId } = categories?.data.find((category) => {
      return category.name === data.category
    }) as Category

    const formData = new FormData()

    formData.append("image", data.image[0])
    formData.append(
      "data",
      JSON.stringify({
        title: data.title,
        description: data.description,
        category_id: categoryId,
      })
    )

    mutate(formData)
  }

  function handleError(error: any) {
    if (error?.title && error.title.type === "too_small") {
      resetField("title", {
        keepError: true,
      })
    }
  }

  function addImageBackground(): void {
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "iamge/svg",
      "image/tiff",
    ]

    const image = watch("image")
    if (image.length === 0) {
      return
    }

    if (!validImageTypes.includes(image[0].type)) {
      setIsFileError(true)
      return
    }

    setIsFileError(false)
    setIsImageBeingUploaded(true)

    const reader = new FileReader()

    reader.readAsDataURL(image[0])
    reader.onload = function () {
      const fileContent = reader.result
      setIsImageBeingUploaded(false)
      setimageBackground(`${fileContent}`)
    }
  }
  console.log("first commit")
  function deleteImageBackground(
    e: MouseEvent<HTMLDivElement>
  ): void {
    e.preventDefault()

    setimageBackground("")
    resetField("image")
  }

  return (
    <Sc.Form onSubmit={handleSubmit(handleData, handleError)}>
      <Sc.LeftContent>
        <Sc.InnerWrapper noPadding={!!imageBackground}>
          {isImageBeingUploaded && (
            <Spinner as="div" animation="border" variant="danger" />
          )}
          {isFileError && (
            <Text type="span" as="span" size="rgl" color="red">
              File type not supported
            </Text>
          )}
          {!imageBackground ? (
            <>
              <Sc.IconContainer>
                <IoCloudUploadOutline />
                <Text type="span" as="span" size="rgl" weight="str">
                  Click to upload
                </Text>
              </Sc.IconContainer>
              <Text
                type="paragraph"
                as="p"
                size="rgl"
                color="gray_200"
                position="left"
              >
                Recommendation: Use high-quality JPG, JPEG, SVG, PNG,
                GIF or TIFF less than 20MB
              </Text>
            </>
          ) : (
            <>
              <Sc.ImageUploaded src={imageBackground} />
              <TrashCan onClick={deleteImageBackground} />
            </>
          )}
          <Sc.Input
            type="file"
            name="image"
            control={control}
            handleChange={addImageBackground}
          />
        </Sc.InnerWrapper>
      </Sc.LeftContent>
      <Sc.RightContent>
        <Input
          name="title"
          type="text"
          control={control}
          placeholder={
            errors.title?.type === "too_small"
              ? errors.title.message
              : "Add a title"
          }
          size="exl"
        />
        <UserInfo
          user={{
            name: user.userData.name,
            image: user.userData.image,
          }}
        />
        <Input
          name="description"
          type="text"
          control={control}
          placeholder="Tell everyone what your Pin is about"
        />
        {isSuccess && (
          <Select
            name="category"
            options={categories.data}
            control={control}
            label="Choose Pin Category"
          />
        )}
        <Sc.WrapperErrorButton>
          <Sc.Button
            size="sml"
            background="redStr"
            color="white"
            type="submit"
          >
            {isLoading ? (
              <Spinner
                as="span"
                animation="border"
                variant="light"
                size="sm"
              />
            ) : (
              "Save Post"
            )}
          </Sc.Button>
          {(errors?.image || errors?.category || errors?.title) && (
            <Text
              type="span"
              as="span"
              size="rgl"
              color="red"
              weight="str"
            >
              Please fill all the fields
            </Text>
          )}
        </Sc.WrapperErrorButton>
      </Sc.RightContent>
    </Sc.Form>
  )
}
