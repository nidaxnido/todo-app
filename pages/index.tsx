import Head from 'next/head'
// import Image from 'next/image'
import { Josefin_Sans } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, useColorMode, Image, useColorModeValue, VStack, Flex, Text, Button, Radio, Input, Checkbox, HStack, StackDivider, Spacer } from '@chakra-ui/react'
import { useLocalStorage } from '@/lib/LocalStorage'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Reorder } from 'framer-motion'

const josef = Josefin_Sans({weight:['400','700'], subsets: ['latin'] })

type note = {
  todo:string,
  status:boolean
}

export default function Home() {
  const isMobile = useMediaQuery({query: '(max-width:425px)'})
  const { colorMode, toggleColorMode } = useColorMode()
  const back = useColorModeValue("light.paleGrayBlue", "dark.darkBlue")
  const bg=useColorModeValue("light.lightGray", "dark.desaturatedBlue")
  const colors= useColorModeValue("light.blackGrayBlue", "dark.grayBlue")
  const divider = useColorModeValue("light.paleGrayBlue", "dark.veryGray2")
  const footer = useColorModeValue("light.darkGrayBlue", "dark.darkGrayBlue")
  const footerHover = useColorModeValue("light.blackGrayBlue", "dark.grayBlueHover")
  const body = useColorModeValue("hsl(236, 33%, 92%)","hsl(235, 21%, 11%)")
  const initial = [
    {
      todo:"Complete onli Javascript course", status:false
    },
    {todo:"Jog around the park 3x", status:true},
    {todo:"10 minutes meditation", status:true},
    {todo:"Read for 1 hour", status:true},
    {todo:"Pick up groceries", status:true},
    {todo:"Complete Todo App on Frontend Mentor", status:true},
  ]
  const [todos, setTodos] = useState<note[]>([]);
  const [tugas, setTugas] = useState("");
  const taskLeft = todos.filter(item=>{return item.status}).length
  const [displayState, setDisplayState] = useState('all');

  useEffect(() => {
      const stored = localStorage.getItem("todos");
      setTodos(stored ? JSON.parse(stored) : []);
      console.log(todos)
  }, []);

  useEffect(() => {
      if(todos.length === 0) return 
      localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addNew = (task:string) =>{
    const newTask = {todo : task, status:true}
    setTodos([...todos, newTask]);
    setTugas("")
  }
  const setComplete = (index:number, isActive:boolean)=>{
    const temp = todos.map((item,i)=>{
      if(i == index){
        return {
          todo:item.todo, status:isActive
        }
      }else{
        return item
      }
    })
    setTodos(temp);
  }
  const removeTodo = (index:number)=>{
    setTodos(todos.filter((item,i)=>i !== index))
  }
  const removeCompleted = ()=>{
    setTodos(todos.filter((item)=>item.status === true))
  }
  const changeDisplay = (mode:string)=>{
    setDisplayState(mode);
  }
  
  return (
    <>
      <Head>
        <title>TODO APP</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{backgroundColor:body}}>
        
        <Box w="100vw" h="100%" minH="100vh" bg={back} position="relative" className={josef.className} fontSize="18px">
          {
            colorMode == 'dark'?
              isMobile?
                <Image src="/images/bg-mobile-dark.jpg" alt="header" w="100%" />
                :
                <Image src="/images/bg-desktop-dark.jpg" alt="header" w="100%" />
              :
              isMobile?
                <Image src="/images/bg-mobile-light.jpg" alt="header" w="100%" />
                :
                <Image src="/images/bg-desktop-light.jpg" alt="header" w="100%" />
          }
          {/* <Flex bg={back} flexDir="column" alignContent="stretch" flex="1 1 auto" >dwedq</Flex> */}
          <VStack w="90%" maxW="600px" color="white" 
                  position="absolute"  left="50%" ml={{base:"-45%",md:"-300px"}} 
                  top="0" mt={{base:"30px",lg:"60px",xl:"100px"}}  >
            <Flex justifyContent="space-between" w="100%" mb={{base:"10px",md:"0",xl:"15px"}}>
              <Text fontSize="40px" fontWeight="bold" color="white" letterSpacing="10px">TODO</Text>
              <Button bg="none" _hover={{bg:"none"}} onClick={toggleColorMode}>
                <Image  src={colorMode == "dark"? "/images/icon-sun.svg":"/images/icon-moon.svg"} />
              </Button>
            </Flex>
            <Flex bg={bg} w="100%" p="15px" borderRadius="5px">
                <Checkbox variant="circular" colorScheme="red" size="lg" mr="10px" ml="20px" disabled></Checkbox>
                <Input variant="ghost" 
                      placeholder='Create a new to do' 
                      bg="transparent" my="auto" pl="0" fontSize="18px"
                      onKeyDown={(e)=>{if(e.key== "Enter")addNew(tugas)}}
                      onChange={(e)=>{setTugas(e.target.value)}}
                      value={tugas}
                      color={colors} />
            </Flex>
            { todos.length > 0 &&
            <VStack bg={bg} w="100%" spacing={0} 
                    divider={<StackDivider borderColor={divider} />}
                    borderRadius="5px" >
              <Reorder.Group axis='y' values={todos} onReorder={setTodos} 
                    style={{width:"100%", listStyle:"none", borderRadius:"5px"}}>       
              {
                
                todos.filter(item =>{
                    if(displayState == "all"){
                      return true
                    }else if(displayState == "active"){
                      return item.status === true
                    }else if(displayState == "completed"){
                      return item.status === false
                    }
                }).map((item, idx)=> {
                  return (
                    <Reorder.Item key={idx} value={item} style={{width:"100%"}}>
                    <Flex bg={bg} w="100%" p="15px" cursor="pointer"
                          borderBottom="1px solid" borderBottomColor={divider}
                          borderTopLeftRadius="5px" borderTopRightRadius="5px"
                          className={styles.parent}
                           key={idx}
                     >
                      <Checkbox variant="circular" 
                               size="lg" mr="10px" ml="20px"
                               textDecor={item.status? "none":"line-through"}
                               onChange={(e)=>{setComplete(idx, (!e.target.checked))}}
                               isChecked={!item.status}
                               color={item.status? colors:footer}
                               _hover={{borderColor:"main.check"}}
                               position="absolute"
                                >
                        {item.todo}
                      </Checkbox>
                      <Flex    w="100%" >
                        <Spacer />
                        <Button bg="none" my="auto"  _hover={{bg:"none"}}
                            onClick={()=>removeTodo(idx)}
                            className={styles.listItem}
                            color={divider}>
                              <Image src="/images/icon-cross.svg" alt="remove" />
                            </Button>  
                        
                        
                      </Flex>
                      
                    </Flex>
                    </Reorder.Item>
                  )
                })
                
              }
              </Reorder.Group>
              <Flex w="100%" p="15px" justifyContent="space-between" color={footer} >
                <Text>{taskLeft} items left</Text>
                {
                  !isMobile &&
                  <Flex>
                    <Text color="main.blue" mr="20px"
                    _hover={{cursor:"pointer"}} onClick={()=>changeDisplay("all")}>All</Text>
                    <Text mr="20px"
                        _hover={{color:footerHover,cursor:"pointer"}}
                        onClick={()=>changeDisplay("active")}>Active</Text>
                    <Text _hover={{color:footerHover,cursor:"pointer"}}
                        onClick={()=>changeDisplay("completed")}>Completed</Text>
                  </Flex>
                }
                <Text _hover={{color:footerHover,cursor:"pointer"}}
                      onClick={()=>removeCompleted()}>Clear Completed</Text>
              </Flex>
             </VStack>
            }
            {
              isMobile && todos.length > 0 &&
              <Flex bg={bg} w="100%" p="15px" alignItems="center" justifyContent="center" mt="20px" borderRadius="5px" color={footer}>
                <Text color="main.blue" mr="20px"
                  _hover={{cursor:"pointer"}} onClick={()=>changeDisplay("all")}>All</Text>
                <Text mr="20px"
                    _hover={{color:footerHover,cursor:"pointer"}}
                    onClick={()=>changeDisplay("active")}>Active</Text>
                <Text _hover={{color:footerHover,cursor:"pointer"}}
                    onClick={()=>changeDisplay("completed")}>Completed</Text>

              </Flex>
            }
            <Text textAlign="center" my="40px !important" color={footer}>Drag and drop to reorder list</Text>
          </VStack>
              

        
          
          
        </Box>
        </main>
    </>
  )
}
