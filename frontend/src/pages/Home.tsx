import SectionContainer from "components/SectionContainer"
import ReactPlayer from "react-player"
import { useMediaQuery } from "react-responsive"

export default function HomePage() {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1280px)" })

  const videoUrl = "https://www.youtube.com/watch?v=1zi-J-Y5Kng"

  return (
    <SectionContainer
      additionalContentClasses="w-full
     flex flex-col justify-center items-center transform scale-90 md:scale-100 text-white"
    >
      <h1 className="standard-header whitespace-nowrap -mt-8">
        Kendama Connection
      </h1>
      <ReactPlayer
        url={videoUrl}
        width="90vw"
        height={isBigScreen ? "720px" : "500px"}
        controls={isBigScreen}
      />
    </SectionContainer>
  )
}
