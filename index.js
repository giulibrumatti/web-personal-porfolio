window.addEventListener("scroll", function(){
    let nav = document.querySelector("nav");
    nav.classList.toggle("abajo", window.scrollY > 0);
})

import React from 'react';
import { Button,FormControl,Stack,Input,VStack,useToast,Textarea, Text, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import Context from "../../Context/Context";
import { htmlAboutme } from '../../resources/data';

function Form() {
    const {register, formState:{errors}, handleSubmit} = useForm();
    const toast = useToast();
    const form = React.useRef();
    const context = React.useContext(Context);


    const onSubmit = (data, event) =>{
        event.preventDefault()
          emailjs.sendForm('service_k46cms9', 'template_l71pywl', form.current, '-OucRu_7vgmbmb-2S')
            .then(() => {
                toast({
                    title: htmlAboutme[context.language].form.modal_title,
                    description: htmlAboutme[context.language].form.modal_message,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right'
                    })
            }, (error) => {
                console.log(error.text);
            });
    }

    return ( 
        <form ref={form}  onSubmit={handleSubmit(onSubmit)} noValidate style={{ width: "70%" }}>
            <FormControl 
                isInvalid={errors.email} 
                display='flex' 
                alignItems='center' 
                isRequired
                position='relative'
            >   
            <VStack width='100%' alignItems='flex-start' spacing={['2rem', '2rem']}>
                <Stack direction={['column', null, 'row']} w='100%' spacing={['2rem', '2rem', '1rem']}>
                    {/* name */}
                    <VStack flex={1} pos='relative'>
                        <Input
                            id='user_name'
                            name="user_name"
                            type='text'
                            placeholder={htmlAboutme[context.language].form.name}
                            borderRadius='10px' 
                            py='1.8rem' 
                            bg='white' 
                            color='blue.light' 
                            {...register('user_name', {
                                required: true,
                            })}
                        />
                        {errors.user_name && 
                            <Text pos='absolute' top='61px' left='0' color='red.400' fontSize='14px'>
                                {errors.user_name && htmlAboutme[context.language].form.modal_required}
                            </Text>} 
                    </VStack>

                    {/* email */}
                    <VStack flex={1} pos='relative'>
                        <Input 
                            id='user_email'
                            name="user_email"
                            type='email'
                            placeholder={htmlAboutme[context.language].form.email}
                            borderRadius='10px' 
                            py='1.8rem' 
                            bg='white' 
                            color='blue.light' 
                            {...register('user_email', {
                                required: htmlAboutme[context.language].form.modal_required,
                                pattern: { value: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i, message: htmlAboutme[context.language].form.modal_email }
                            })}
                        />
                        {errors.user_email && 
                            <Text pos='absolute' top='61px' left='0' color='red.400' fontSize='14px'>
                                {errors.user_email.type == 'required' && htmlAboutme[context.language].form.modal_required}
                                {errors.user_email.type == 'pattern' && htmlAboutme[context.language].form.modal_email}
                            </Text>}
                    </VStack>

                </Stack>


                {/* Message */}
                <VStack pos='relative' flex={1} w='100%'>
                    <Textarea 
                        id='message'
                        name='message'
                        placeholder={htmlAboutme[context.language].form.message}
                        borderRadius='10px' 
                        py='1.8rem' 
                        bg='white' 
                        color='blue.light' 
                        overflowY='hidden'
                        minH='200px'
                        {...register('message', {
                            required: true,
                        })}
                    />
                    {errors.message && 
                        <Text pos='absolute' top='196px' left='0' color='red.400' fontSize='14px'>
                            {errors.message && htmlAboutme[context.language].form.modal_required}
                        </Text>}
                </VStack>

                <Button 
                    type='submit' 
                    variant='solid' 
                    marginLeft='1rem'
                    alignSelf='flex-end'
                >{htmlAboutme[context.language].form.submit}
                </Button>
            </VStack>
                  
            </FormControl> 
        </form>

    );
}

export { Form };