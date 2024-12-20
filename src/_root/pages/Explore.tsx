import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/shared/Loader"
import SearchResults from "@/components/shared/SearchResults"
import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/useDebounce"
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations"
import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"

const Explore = () => {
  // Initialize intersection observer to track when the user scrolls to the bottom of the page
  const { ref, inView } = useInView()
  // Fetch posts data and pagination control using a custom hook
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts()
  // Manage state for search input value
  const [searchValue, setSearchValue] = useState("")
  // Debounce search input to avoid excessive API calls while typing
  const debouncedValue = useDebounce(searchValue, 500)
  // Fetch posts based on the debounced search value
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedValue)


  // Infinite scrolling: fetch next page of posts when inView and search is not active
  useEffect(() => {
    if(inView && !searchValue) fetchNextPage()
  }, [inView, searchValue])


  // If posts data is still loading, show Loader component
  if(!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }


  // Conditional flags for rendering search results or paginated posts on the interface
  const shouldShowSearchResults = searchValue !== ""
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item.documents.length === 0)

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img 
            src="/assets/icons/search.svg"
            width={20}
            height={20}
            alt="search"
          />
          <Input 
            type="text"
            placeholder="search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img 
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults 
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}  
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : posts.pages.map((item, index) => (
          <GridPostList key={`page-${index}`} posts={item.documents}/>
        ))}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />      
        </div>
      )}
    </div>
  )
}

export default Explore