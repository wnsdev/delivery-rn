import { useState } from "react";
import Input from "@/components/input";
import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Feather } from "@expo/vector-icons";
import { Product } from "@/components/product";
import { LinkButton } from "@/components/link-button";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "expo-router";

const PHONE_NUMBER = "5511945280784";
export default function Cart() {
  const [address, setAddress] = useState("");
  const cartStore = useCartStore();
  const navigation = useNavigation();

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );
  function handleOrder() {
    if (address.trim().length === 0)
      return Alert.alert("Pedido", "Informe os dados da entrega.");

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join();

    const message = `🍔 NOVO PEDIDO ${products} \n🛵 Entregar em: ${address}  \n💲 Total: ${total}`;
    Linking.openURL(`http://wa.me/${PHONE_NUMBER}?text=${message}`);
    cartStore.clear();
    navigation.goBack();
  }
  function handleProductRemove(product: ProductCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      { text: "Cancelar" },
      { text: "Remover", onPress: () => cartStore.remove(product.id) },
    ]);
  }
  return (
    <View className="flex-1 pt-16">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio.
              </Text>
            )}
            <View className="flex-1 flex-row gap-2 mt-3 mb-4 px-5">
              <Text className="text-xl font-subtitle text-white">Total:</Text>
              <Text className="text-xl font-heading text-lime-400">
                {total}
              </Text>
            </View>
            <Input
              placeholder={`Informe o endereço de entrega: \n\nRua, Bairro, CEP, Número e Complemento...`}
              onChangeText={setAddress}
              onSubmitEditing={handleOrder}
              blurOnSubmit
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
