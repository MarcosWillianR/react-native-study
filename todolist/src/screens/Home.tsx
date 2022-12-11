import { Heading, HStack, Image, Input, VStack, Icon, Pressable } from "native-base";
import { Feather } from '@expo/vector-icons';

import logoPng from '@assets/Logo.png';

export function Home() {
  return (
    <VStack bg="gray.600" flex={1}>
      <VStack bg="gray.700" pt={16} px={8} pb={6} alignItems="center">
        <Image source={logoPng} />

        <HStack top={12}>
          <Input
            bg="gray.500"
            flex={1}
            h={14}
            px={4}
            borderWidth={0}
            fontSize="md"
            color="white"
            fontFamily="body"
            placeholderTextColor="gray.300"
            _focus={{
              bg: 'gray.500',
              borderWidth: 1,
              borderColor: 'primary.500'
            }}
          />

          <Pressable bg="secondary.700" p={5} rounded="md" ml={1}>
            <Icon as={Feather} name="plus-circle" w={16} h={16} color="white" />
          </Pressable>
        </HStack>
      </VStack>
    </VStack>
  )
}