import * as Sc from "./style"
import logo from "../../assets/logo.png"
import { BsHouse } from "react-icons/bs"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { Text } from "../../global/styles/Typography"
import { Category } from "./Category"
import { useUser } from "../../hooks/useUser"

export const categories = [
  {
    name: "Cars",
    image:
      "https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg",
  },
  {
    name: "Fitness",
    image:
      "https://i.pinimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg",
  },
  {
    name: "Wallpaper",
    image:
      "https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg",
  },
  {
    name: "Websites",
    image:
      "https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg",
  },
  {
    name: "Photo",
    image:
      "https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg",
  },
  {
    name: "Food",
    image:
      "https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg",
  },
  {
    name: "Nature",
    image:
      "https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg",
  },
  {
    name: "Art",
    image:
      "https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg",
  },
  {
    name: "Travel",
    image:
      "https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg",
  },
  {
    name: "Quotes",
    image:
      "https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg",
  },
  {
    name: "Cats",
    image:
      "https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg",
  },
  {
    name: "Dogs",
    image:
      "https://i.pinimg.com/236x/1b/c8/30/1bc83077e363db1a394bf6a64b071e9f.jpg",
  },
  {
    name: "Other",
    image:
      "https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg",
  },
]

export function SideBar() {
  const { user } = useUser()

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
          {categories.map((category) => {
            return (
              <Category
                name={category.name}
                url={category.image}
                key={category.name}
              />
            )
          })}
        </Sc.ContainerCategories>
      </Sc.ContentContainer>
      <Sc.Button size="sml">
        <img src={user.userData.image} alt="dadas" />
        <Text type="span" as="span" size="rgl" color="black">
          {user.userData.name}
        </Text>
        <MdOutlineKeyboardArrowRight />
      </Sc.Button>
    </Sc.StyledSideBar>
  )
}
