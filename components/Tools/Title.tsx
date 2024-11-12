import { useFileUploadProvider } from '@/providers/FileUploadProvider'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

const Title = () => {
  const { name, setName } = useFileUploadProvider()

  return (
    <div className="flex items-center w-full gap-2 text-black px-3">
      <Label htmlFor="title">Title: </Label>
      <Input
        id="title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-black max-w-[250px]"
      />
    </div>
  )
}

export default Title
