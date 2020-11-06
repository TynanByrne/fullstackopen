import { useRouteMatch } from 'react-router-dom'

const useMatchedHook = (route, resource) => {
  const match = useRouteMatch(route)
  const matchedResource = match ?
  resource.find(r => r.id === Number(match.params.id))
  : null

  return matchedResource
}

export default useMatchedHook