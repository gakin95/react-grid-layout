
type imageSourceProp = {
  imageSource?:string
}
export const PhotoImage = ({imageSource}:imageSourceProp) => {
  return <img alt="test img 1" src={imageSource} width="100%" height="100%" />
}
