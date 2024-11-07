import { useState } from "react";
import {
  Center,
  Image,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Tag,
  Input,
  Flex,
  Box,
} from "@chakra-ui/react";
import { data } from "../utils/data";

export const RecipeListPage = ({ clickFn }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterRecipes = () => {
    return data.hits.filter((hit) => {
      const recipe = hit.recipe;

      const recipeName = recipe.label.toLowerCase();
      const healthLabels =
        recipe.healthLabels?.map((label) => label.toLowerCase()) || [];

      return (
        recipeName.includes(searchTerm.toLowerCase()) ||
        healthLabels.some((label) => label.includes(searchTerm.toLowerCase()))
      );
    });
  };

  return (
    <Center bgColor="yellow.50" minH="100vh" flexDir="column" p={4}>
      <Heading size="lg" mb={6} textAlign="center" color="teal.600">
        Your Recipe App
      </Heading>

      <Input
        color="teal.600"
        placeholder="Search by name or health label"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={6}
        w="300px"
      />

      <Flex wrap="wrap" justify="center" gap={4}>
        {filterRecipes().map((hit, index) => {
          const recipe = hit.recipe;

          return (
            <Card
              key={index}
              borderRadius="xl"
              w="300px"
              mb={6}
              boxShadow="lg"
              onClick={() => clickFn(recipe)}
              cursor="pointer"
              textAlign="center"
            >
              <CardBody>
                <Flex justify="center">
                  <Image
                    h="200px"
                    w="100%"
                    src={recipe.image}
                    alt={recipe.label}
                    borderRadius="md"
                    objectFit="cover"
                  />
                </Flex>

                <Stack mt="4" spacing="3" align="center">
                  <Text fontSize="sm" fontWeight="medium" color="gray">
                    {recipe.mealType}
                  </Text>
                  <Heading size="md" color="teal.900">
                    {recipe.label}
                  </Heading>
                  <Flex gap={2}>
                    {recipe.dietLabels?.map((label, idx) => (
                      <Tag key={idx} colorScheme="green">
                        {label}
                      </Tag>
                    ))}
                  </Flex>

                  <Flex gap={2}>
                    {recipe.healthLabels?.map((healthLabel, idx) => {
                      if (
                        healthLabel === "Vegetarian" ||
                        healthLabel === "Vegan"
                      ) {
                        return (
                          <Tag key={idx} colorScheme="purple">
                            {healthLabel}
                          </Tag>
                        );
                      }
                      return null;
                    })}
                  </Flex>

                  <Text fontSize="sm" textAlign="left">
                    Dish: {recipe.dishType}
                  </Text>

                  <Box mt={1}>
                    <Text fontSize="sm">Cautions:</Text>
                    <Flex wrap="wrap" gap={2} justify="center">
                      {recipe.cautions?.map((caution, idx) => (
                        <Tag key={idx} colorScheme="red">
                          {caution}
                        </Tag>
                      ))}
                    </Flex>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          );
        })}
      </Flex>
    </Center>
  );
};
