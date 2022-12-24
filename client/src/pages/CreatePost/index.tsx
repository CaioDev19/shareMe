import * as Sc from "./style"
import { Input } from "../../components/Form/Input"
import { Text } from "../../global/styles/Typography"
import { useUser } from "../../hooks/useUser"
import { Select } from "../../components/Form/Select"
import { useCategories } from "../../hooks/query/useCategories"
import { Navigate } from "react-router-dom"
import { IoCloudUploadOutline } from "react-icons/io5"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postSchema } from "../../utils/validators/postSchema"
import { useMutation } from "@tanstack/react-query"
import * as api from "../../services/api"

export function CreatePost() {
  const { user } = useUser()
  const {
    data: categories,
    isSuccess,
    shouldSignOut,
  } = useCategories()
  const { handleSubmit, control, register } = useForm({
    resolver: zodResolver(postSchema),
  })
  const { mutate } = useMutation(api.createPost, {
    onSuccess: (data) => {
      console.log(data)
    },
  })

  function handleData(data: any) {
    const { id: categoryId } = categories?.data.find((category) => {
      return category.name === data.category
    }) as api.Category

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
    console.log(error)
  }

  if (shouldSignOut) {
    return <Navigate to="/login" />
  }

  return (
    <Sc.Form onSubmit={handleSubmit(handleData, handleError)}>
      <Sc.LeftContent>
        <Sc.InnerWrapper>
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
            Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF
            or TIFF less than 20MB
          </Text>
          <Sc.FileInput type="file" {...register("image")} />
        </Sc.InnerWrapper>
      </Sc.LeftContent>
      <Sc.RightContent>
        <Input
          name="title"
          type="text"
          control={control}
          placeholder="Add your tittle"
          size="exl"
        />
        <Sc.WrapperUserInfo>
          <img src={user.userData.image} alt="profile" />
          <Text
            type="span"
            as="span"
            size="rgl"
            color="black"
            weight="sstr"
          >
            {user.userData.name}
          </Text>
        </Sc.WrapperUserInfo>
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
        <Sc.Button
          size="sml"
          background="redStr"
          color="white"
          type="submit"
        >
          Save post
        </Sc.Button>
      </Sc.RightContent>
    </Sc.Form>
  )
}
