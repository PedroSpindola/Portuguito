import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, BackHandler, FlatList, Modal } from "react-native";
import Styles from "../Styles.js/ProfileImageStyles.js";
import stylesModalIcon from "../Styles.js/StylesModalIcon";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig.js";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileImage() {
    const db = getFirestore(FIREBASE_APP);

    const [currentProfile, setCurrentProfile] = useState(undefined);
    const [profileImagesData, setProfileImagesData] = useState([]);
    const [modalProfileVisible, setModalProfileVisible] = useState(false);
    const [modalProfileTitle, setModalProfileTitle] = useState(null);
    const [modalProfileImage, setModalProfileImage] = useState(null);
    const [modalProfileDescription, setModalProfileDescription] = useState(null);

    const navigation = useNavigation();

    const userId = FIREBASE_AUTH.currentUser?.uid;

    const profileImages = {
        "baseProfile": require("../Imagens/profile/profileBase.jpg"),
        "studentProfile": require("../Imagens/profile/profileLibrary.png")
    };

    const updateProfileImage = async () => {
        if (currentProfile !== undefined) {
            try {
                const userRef = doc(db, "users", userId);
                await updateDoc(userRef, { urlImagemPerfil: currentProfile });
            } catch (err) {
                console.log('Error when update profile image: ' + err)
            }
        }

        navigation.goBack({ reload: true });
    }

    useEffect(() => {
        const backAction = () => {
            updateProfileImage()
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, [navigation]);

    useEffect(() => {
        const fetchUserProfileImages = async () => {
            try {
                const profileImagesRef = collection(db, "users", userId, "userProfiles");
                const profileImagesQuery = query(profileImagesRef);
                const profileImagesSnap = await getDocs(profileImagesQuery);
                const profileImages = profileImagesSnap.docs;

                for (let i = profileImages.length - 1; i >= 0; i--) {
                    const doc = profileImages[i];
                    const docData = doc.data();
                    profileImages.push(docData);
                }

                setProfileImagesData(profileImages);
            } catch (error) {
                console.error("Error when fetch user profile images: ", error);
            }
        };

        const fetchCurrentUserProfile = async () => {
            try {
                const userRef = collection(db, "users");
                const userQuery = query(userRef, where('userId', '==', userId));
                const userSnap = await getDocs(userQuery);
                const userData = userSnap.docs[0].data();
                setCurrentProfile(userData.urlImagemPerfil);

            } catch (error) {
                console.error("Error when fetch user profile images: ", error);
            }
        };

        fetchCurrentUserProfile();
        fetchUserProfileImages();
    }, [db, userId]);

    const ImageProfile = ({ image, has }) => {
        return (
            <TouchableOpacity
                style={Styles.profileContainer}
                onPress={() => has && setCurrentProfile(image)}
            >
                {image === 'baseProfile' &&
                    <>
                        {
                            currentProfile === 'baseProfile' &&
                            <View
                                style={Styles.selectIconFrame}
                            >
                                <Ionicons name="checkmark-outline" style={Styles.selectIcon} />
                            </View>
                        }
                        <View style={[
                            Styles.backgroundUser,
                            currentProfile === 'baseProfile' && Styles.selectedProfile
                        ]}>
                            <Image style={Styles.image} source={profileImages['baseProfile']} />
                            {!has && <View style={Styles.overlay} />}
                        </View>
                        <View style={Styles.textContainer}>
                            <Text style={Styles.profileText}>Padrão</Text>
                            <TouchableOpacity
                                style={Styles.infoButton}
                                onPress={() => {
                                    openIconModal('Padrão', 'baseProfile', 'Portuguita Padrão,\nObtida ao criar uma conta no Portuguito');
                                }}
                            >
                                <Ionicons name="information-outline" style={Styles.infoIcon} />
                            </TouchableOpacity>
                        </View>
                    </>
                }
                {
                    image === 'studentProfile' &&
                    <>
                        {
                            currentProfile === 'studentProfile' &&
                            <View
                                style={Styles.selectIconFrame}
                            >
                                <Ionicons name="checkmark-outline" style={Styles.selectIcon} />
                            </View>
                        }
                        <View style={[
                            Styles.backgroundUser,
                            currentProfile === 'studentProfile' && Styles.selectedProfile
                        ]}>
                            <Image style={Styles.image} source={profileImages['studentProfile']} />
                            {!has && <View style={Styles.overlay} />}
                        </View>
                        <View style={Styles.textContainer}>
                            <Text style={Styles.profileText}>Estudante</Text>
                            <TouchableOpacity
                                style={Styles.infoButton}
                                onPress={() => {
                                    openIconModal('Estudante', 'studentProfile', 'Portuguita Estudante,\nObtida ao acertar todas as questões da lista de um professor');
                                }}
                            >
                                <Ionicons name="information-outline" style={Styles.infoIcon} />
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </TouchableOpacity >
        )
    };

    function IconModalProfile({ title, image, description, visible, onClose }) {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}>
                <View style={stylesModalIcon.container}>
                    <View style={stylesModalIcon.boxGeral}>
                        <View style={stylesModalIcon.modalHeader}>
                            <Text style={stylesModalIcon.modalTitle}>
                                Imagem de Perfil {title}
                            </Text>
                            <TouchableOpacity style={stylesModalIcon.closeButton} onPress={onClose}>
                                <Ionicons name="close" style={stylesModalIcon.iconeDelete} />
                            </TouchableOpacity>
                        </View>
                        <View style={stylesModalIcon.modalBody}>
                            <View style={stylesModalIcon.backgroundUserModal}>
                                <Image style={stylesModalIcon.imageModal} source={profileImages[image]} />
                            </View>
                            <Text style={stylesModalIcon.modalDescription}>{description}</Text>
                        </View>
                    </View>
                </View>
            </Modal >
        );
    }

    const openIconModal = (title, image, description) => {
        setModalProfileTitle(title);
        setModalProfileImage(image);
        setModalProfileDescription(description);
        setModalProfileVisible(true);
    };

    return (
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
            <View style={Styles.container}>
                <IconModalProfile
                    title={modalProfileTitle}
                    image={modalProfileImage}
                    description={modalProfileDescription}
                    visible={modalProfileVisible}
                    onClose={() => setModalProfileVisible(false)}
                />
                <FlatList
                    style={Styles.profilesContainer}
                    data={profileImagesData}
                    numColumns={2}
                    keyExtractor={(item) => item.profileName}
                    renderItem={({ item }) => (
                        <ImageProfile
                            image={item.profileName}
                            has={item.has}
                        />
                    )}
                />


                < TouchableOpacity
                    style={Styles.button}
                    onPress={() => {
                        updateProfileImage();
                    }}
                >
                    <Text style={Styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View >
        </LinearGradient>
    );
}

