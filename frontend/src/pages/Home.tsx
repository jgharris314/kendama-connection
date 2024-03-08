import SectionContainer from "components/SectionContainer"
import ReactPlayer from "react-player"
import { useMediaQuery } from "react-responsive"

export default function HomePage() {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1280px)" })

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

  const videoUrl = isMobile
    ? "https://m.youtube.com/watch?v=0Kt8mY64zcg"
    : "https://www.youtube.com/watch?v=0Kt8mY64zcg"

  return (
    <SectionContainer
      additionalContentClasses="w-full
     flex flex-col justify-center items-center transform scale-90 md:scale-100 text-white"
    >
      <h1 className="standard-header whitespace-nowrap">Kendama Connection</h1>
      <ReactPlayer
        url={videoUrl}
        width="90vw"
        height={isBigScreen ? "720px" : "500px"}
        controls={isBigScreen}
      />
    </SectionContainer>
  )
}
