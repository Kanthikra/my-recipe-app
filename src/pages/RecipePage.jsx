import {
  Center,
  Button,
  Heading,
  Text,
  Image,
  Grid,
  Box,
  Flex,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

export const RecipePage = ({ recipe, clickFn }) => {
  const roundNumber = (num) => {
    return num ? num.toFixed(2) : num;
  };

  const selectedNutrients = [
    "ENERC_KCAL",
    "PROCNT",
    "FAT",
    "CHOCDF",
    "CHOLE",
    "NA",
  ];

  const filteredNutrients = selectedNutrients.map((nutrientKey) => {
    const nutrient = recipe.totalNutrients[nutrientKey];
    return nutrient
      ? {
          label: nutrient.label,
          quantity: nutrient.quantity,
          unit: nutrient.unit,
        }
      : null;
  });

  return (
    <Center bgColor="beige" minH="100vh" p={4}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        w="100%"
        maxW="900px"
        bg="white"
        borderRadius="lg"
        boxShadow="xl"
        p={6}
        mb={6}
      >
        <Button
          onClick={() => clickFn(null)}
          colorScheme="teal"
          size="sm"
          width="200px"
          mb={6}
          variant="outline"
        >
          Back to Recipe List
        </Button>

        <Heading size="lg" mb={6} textAlign="center">
          {recipe.label}
        </Heading>

        <Image
          src={recipe.image}
          alt={recipe.label}
          maxW="100%"
          maxH="500px"
          height="auto"
          borderRadius="md"
          mb={4}
        />

        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={6}
          width="80%"
          mb={6}
        >
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Meal type:
            </Text>
            <Text fontSize="lg">{recipe.mealType}</Text>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Dish type:
            </Text>
            <Text fontSize="lg">{recipe.dishType}</Text>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Cuisine type:
            </Text>
            <Text fontSize="lg">{recipe.cuisineType}</Text>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Cooking time:
            </Text>
            <Text fontSize="lg">
              {recipe.totalTime ? recipe.totalTime : "Cooking time unknown"}
            </Text>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Diet Labels:
            </Text>
            <Text fontSize="lg">{recipe.dietLabels.join(", ")}</Text>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Cautions:
            </Text>
            <Text fontSize="lg">{recipe.cautions.join(", ")}</Text>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Servings:
            </Text>
            <Text fontSize="lg">{recipe.yield}</Text>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Health Labels:
            </Text>
            <Flex mt={2} wrap="wrap" gap={2}>
              {recipe.healthLabels &&
                recipe.healthLabels.map((label) => (
                  <Tag
                    key={label}
                    colorScheme="teal"
                    size="md"
                    borderRadius="full"
                  >
                    <TagLabel>{label}</TagLabel>
                  </Tag>
                ))}
            </Flex>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Ingredients:
            </Text>
            <Text fontSize="lg">{recipe.ingredientLines.join(", ")}</Text>
          </Box>

          <Box width="80%" mb={6}>
            <Text fontSize="lg" fontWeight="bold">
              Total Nutrients:
            </Text>
            <Grid templateColumns="1fr 1fr" gap={4} mt={4}>
              {filteredNutrients.map(
                (nutrient) =>
                  nutrient && (
                    <Box
                      key={nutrient.label}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Text fontSize="md" fontWeight="medium">
                        {nutrient.label}
                      </Text>
                      <Text fontSize="md">
                        {roundNumber(nutrient.quantity)}
                      </Text>
                      <Text fontSize="md">{nutrient.unit}</Text>
                    </Box>
                  )
              )}
            </Grid>
          </Box>
        </Grid>
      </Flex>
    </Center>
  );
};
