import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";
import { Link } from "expo-router";

type HeaderProps = {
  title: string;
  cartQuantity?: number;
};
export function Header({ title, cartQuantity = 0 }: HeaderProps) {
  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Image className="w-32 h-6" source={require("@/assets/logo.png")} />
        <Text className="text-white text-xl font-heading">{title}</Text>
      </View>
      {cartQuantity > 0 && (
        <Link href="/cart" asChild>
          <TouchableOpacity className="relative" activeOpacity={0.7}>
            <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center absolute -top-1 z-10 -right-1.5">
              <Text className="text-slate-900 font-bold text-xs">
                {cartQuantity}
              </Text>
            </View>
            <Feather name="shopping-bag" color={colors.white} size={24} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
}
