import * as Sc from "./style"
import { Input } from "../../components/Form/Input"
import { Text } from "../../global/styles/Typography"
import { useUser } from "../../hooks/useUser"
import { Select } from "../../components/Form/Select"
import { useCategories } from "../../hooks/query/useCategories"
import { Navigate } from "react-router-dom"

export function CreatePost() {
  const { user } = useUser()
  const {
    data: categories,
    isSuccess,
    shouldSignOut,
  } = useCategories()

  if (shouldSignOut) {
    return <Navigate to="/login" />
  }

  return (
    <Sc.CardContainer>
      <Sc.LeftContent>batata</Sc.LeftContent>
      <Sc.RightContent>
        <Input
          name="title"
          type="text"
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
          name="title"
          type="text"
          placeholder="Tell everyone what your Pin is about"
        />
        <Input
          name="title"
          type="text"
          placeholder="Select Category"
        />
        {isSuccess && (
          <Select name="category" options={categories.data} />
        )}
      </Sc.RightContent>
    </Sc.CardContainer>
  )
}
