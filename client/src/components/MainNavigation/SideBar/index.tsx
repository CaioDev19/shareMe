import * as Sc from "./style"
import logo from "../../../assets/logo.png"
import { BsHouse } from "react-icons/bs"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { Text } from "../../../global/styles/Typography"
import { Category } from "./Category"
import { useLoggedUser } from "../../../hooks/useLoggedUser"
import { useCategories } from "../../../hooks/react-query/query/useCategories"
import { useNavigate } from "react-router-dom"

export function SideBar() {
  const { user } = useLoggedUser()
  const navigate = useNavigate()
  const { data: response, isLoading } = useCategories()

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
              pointer
              onClick={() => navigate("/home")}
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
          {!isLoading &&
            response?.data.map((category) => {
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
      <Sc.Button
        size="sml"
        onClick={() => navigate(`user_profile/${user.userData.id}`)}
      >
        <img src={user.userData.image} alt="profile" />
        <Text type="span" as="span" size="rgl" color="black">
          {user.userData.name}
        </Text>
        <MdOutlineKeyboardArrowRight />
      </Sc.Button>
    </Sc.StyledSideBar>
  )
}
