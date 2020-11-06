import { useRouteMatch } from 'react-router-dom'

const useMatchedHook = (route, resource) => {
  console.log('route is', route)
  const match = useRouteMatch(route)
  console.log("match is", match)
  console.log("resource is", resource)
  const matchedResource = match ?
  resource.find(r => r.id === match.params.id)
  : null

  return matchedResource
}

export default useMatchedHook