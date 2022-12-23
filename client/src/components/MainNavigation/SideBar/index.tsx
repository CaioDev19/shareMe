import * as Sc from "./style"
import logo from "../../../assets/logo.png"
import { BsHouse } from "react-icons/bs"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { Text } from "../../../global/styles/Typography"
import { Category } from "./Category"
import { useUser } from "../../../hooks/useUser"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { Category as ICategory } from "../../../services/api"

export function SideBar() {
  const { user } = useUser()
  const queryClient = useQueryClient()
  const categories = queryClient.getQueryData<
    AxiosResponse<ICategory[]>
  >(["category"])

  return (
    <Sc.StyledSideBar>
      <Sc.ContentContainer>
        <Sc.UpperContainer>
          <Sc.Logo src={logo} alt="Logo" />
          <Sc.Wrapper>
            <BsHouse />
            <Text
              type="span"
              as="span"
              size="rgl"
              position="left"
              color="gray_200"
            >
              Home
            </Text>
          </Sc.Wrapper>
          <Text
            type="span"
            as="span"
            size="lrg"
            position="left"
            color="black"
          >
            Discover categories
          </Text>
        </Sc.UpperContainer>
        <Sc.ContainerCategories>
          {categories?.data.map((category) => {
            return (
              <Category
                name={category.name}
                url={category.image}
                key={category.id}
              />
            )
          })}
        </Sc.ContainerCategories>
      </Sc.ContentContainer>
      <Sc.Button size="sml">
        <img src={user.userData.image} alt="profile" />
        <Text type="span" as="span" size="rgl" color="black">
          {user.userData.name}
        </Text>
        <MdOutlineKeyboardArrowRight />
      </Sc.Button>
    </Sc.StyledSideBar>
  )
}
