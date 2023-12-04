import { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = ["Full-time", "Part-time", "Contract"];

export default function Welcome({ searchTerm, setSearchTerm, handlePress }) {
	const [activeJobType, setActiveJobType] = useState("Full-time");
	const router = useRouter();
	return (
		<View>
			<View style={styles.container}>
				<Text style={styles.userName}>Howdy Brady!</Text>
				<Text style={styles.welcomeMessage}>Find your perfect gig today!</Text>
			</View>
			<View style={styles.searchContainer}>
				<View style={styles.searchWrapper}>
					<TextInput
						style={styles.searchInput}
						value={searchTerm}
						onChange={(text) => setSearchTerm(text)}
						placeholder="What are you looking for?"
					/>
				</View>
				<TouchableOpacity style={styles.searchBtn} onPress={handlePress}>
					<Image
						source={icons.search}
						resizeMode="contain"
						style={styles.searchBtnImage}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.tabsContainer}>
				<FlatList
					data={jobTypes}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.tab(activeJobType, item)}
							onPress={() => {
								setActiveJobType(item);
								router.push(`/search/${item}`);
							}}
						>
							<Text style={styles.tabText(activeJobType, item)}>{item}</Text>
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item}
					contentContainerStyle={{ columnGap: SIZES.small }}
					horizontal
				/>
			</View>
		</View>
	);
}
