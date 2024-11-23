import { createFileRoute } from '@tanstack/react-router'
import { VStack } from '../../components'

const homeItems = [
  { title: "test", description: "Hello world." },
  { title: "test", description: "Hello world." },
  { title: "test", description: "Hello world." },
  { title: "test", description: "Hello world." },
  { title: "test", description: "Hello world." },
  { title: "test", description: "Hello world." },
  { title: "test", description: "Hello world." },
  { title: "test", description: "Hello world." },
  { title: "test", description: "Hello world." },
  { title: "test", description: "Hello world." },
  { title: "test", description: "Hello world." },
]

// User.fetchSingle().then(user => {
//   console.log(user)
// })

// const supabaseService = new SupabaseService()
// SupabaseService.fetchSingle(User, "c7e80cb0-7d3d-411f-9983-5e3addf62980", { email: "ncuapp@test.com" }).then(
//   response => {
//     console.log(response)
//   }
// )

// SupabaseService.fetchMultiple(User).then(
//   response => {
//     console.log(response)
//   }
// )

// async function fetch() {
//   const { data } = await supabase.from('members').select('*')
//   console.log(data)
// }
// fetch()

export const Route = createFileRoute('/home/')({

  component: () => <div>
    <section className='h-[200px] mb-[40px] bg-yellow-50 relative border-b-[5px] border-gray-600'>

      <div className='flex flex-col absolute left-[10px] bottom-[5px]'>
        <h1 className='font-bold text-4xl text-black'>這裡最多七個字</h1>
        <h2 className='font-bold text-black'>中文系 二年級</h2>
      </div>

      {/* <div className='
        w-[125px] h-[125px]
        absolute right-[15px] bottom-[-25px]
        border-[4px] border-gray-600 rounded-full bg-gray-500
      '></div> */}

      <div className="avatar absolute right-[15px] bottom-[-25px]">
        <div className="ring-gray-300 w-[125px] rounded-full ring">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>

      <span className='
        absolute top-[20px] right-[15px]
        text-black font-bold text-xs
      '>
        變更個人檔案
      </span>
    </section>

    <VStack className='px-[10px] gap-[20px]'>


      {/* {homeItems.map((item, index) => (
        <WelcomeCard title={item.title} description={item.description} />
      ))} */}

      {/* <NcuInput />

      <NcuTextarea>
        Hello
      </NcuTextarea>

      <NcuSwitch label="test">X</NcuSwitch>

      <NcuButton>Test</NcuButton> */}
    </VStack>
  </div>,
})
