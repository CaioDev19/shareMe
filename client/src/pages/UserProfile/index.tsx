import { useParams } from "react-router-dom"
import { Text } from "../../global/styles/Typography"
import { useUser } from "../../hooks/useUser"
import { Button } from "../../global/styles/Button"
import { IoMdLogOut } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { useInfiniteQuery } from "@tanstack/react-query"
import * as Sc from "./style"
import * as api from "../../services/api"
import { Waypoint } from "react-waypoint"
import { Fragment } from "react"

export function UserProfile() {
  const { id } = useParams()
  const { isSuccess, data, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery(["userPosts", id as string], api.listUserPosts, {
      getNextPageParam: (lastPage, _pages) => {
        if (lastPage.data.currentPage < lastPage.data.totalPages) {
          return lastPage.data.currentPage + 1
        }
        return undefined
      },
    })
  const { user, signOut } = useUser()
  const navigate = useNavigate()

  return (
    <Sc.Container>
      <Sc.Banner>
        <Sc.LogOutBtn
          onClick={() => {
            signOut()
            navigate("/login")
          }}
        >
          <IoMdLogOut />
        </Sc.LogOutBtn>
      </Sc.Banner>
      <Sc.ContentContainer>
        <Sc.UserInfoContainer>
          <Sc.UserImage src={user.userData.image} alt="User image" />
          <Text type="title" as="h2" size="exl" weight="sstr">
            {user.userData.name}
          </Text>
          <Sc.ButtonWrapper>
            <Button
              size="sml"
              background="red"
              color="white"
              radios="round"
            >
              Created
            </Button>
            <Button
              size="sml"
              background="whitesh"
              color="black"
              radios="round"
            >
              Saved
            </Button>
          </Sc.ButtonWrapper>
        </Sc.UserInfoContainer>
        {isSuccess && (
          <div>
            {data.pages.map((group, i) => {
              return (
                <Fragment key={i}>
                  {group.data.results.map((post: any) => {
                    return (
                      <img
                        src={post.image}
                        key={post.id}
                        alt={post.image_name}
                      />
                    )
                  })}
                  {hasNextPage && (
                    <Waypoint
                      onEnter={() => {
                        fetchNextPage()
                        console.log("mais coisa")
                      }}
                    />
                  )}
                </Fragment>
              )
            })}
          </div>
        )}
      </Sc.ContentContainer>
      {isFetching && (
        <Text
          type="title"
          as="h2"
          size="exl"
          weight="sstr"
          color="red"
        >
          Loading...
        </Text>
      )}
    </Sc.Container>
  )
}
