/*

    Copyright © 2016-2017 Dominique Climent, Florian Dubath

    This file is part of Monnaie-Leman Wallet.

    Monnaie-Leman Wallet is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Monnaie-Leman Wallet is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Monnaie-Leman Wallet.  If not, see <http://www.gnu.org/licenses/>.

*/
// French
'use strict';
var fr = function() {}
fr.code = 'fr';
fr.data = {
  /****************************************/
  Version:'&middot; v1.0 &middot;&nbsp;',
  CUR:'LEM',
  CUR_global:'Léman',
  CUR_nanti:'e-leman',
  CUR_credit_mut:'lemanex',
  /****************************************/
  
  GP_Wait:              'En attente du serveur... Si ce message persiste vérifier votre connection puis cliquer ici:',
  GP_Wait_tran:         'Votre ordre est actuellement en traitement (environ 30") ',
  ID_placeholder:       'Tapez une adresse ici',
  /* Navigation*/
  NAV_AddWallet:        'Créer un portefeuille',
  NAV_OpenWallet:       'Importer un portefeuille',
  NAV_ViewWallet:       'Recevoir',
  NAV_Transaction:      'Envoyer',
  NAV_Limites:          'Compte',
  NAV_Help:             'Aide',
  NAV_Transactions:     'Transactions',
  NAV_Contacts:         'Contacts',
  NAV_Close:            'Verrouiller le portefeuille',
  NAV_OpenStorage:      'Ouvrir un portefeuille',
  NAV_Exchange:         'Compte',
  NAV_Global:           'Général',
  
  FILE_pickWallet:      'Choisir un fichier de portefeuille',
  FILE_pickContact:     'Choisir un fichier de contacts',
  FILE_pickMemo:        'Choisir un fichier de mémos',
  FILE_selectedFile:    'Fichier sélectionné',
  FILE_open:            'Choisir',
  
  
  HELP_1: '<strong>Aide Gestion des Portefeuilles</strong>',
  HELP_2: '<strong>Aide Contenu du Portefeuille</strong>',
  
  
  
  /* Generate Wallets */
  GEN_Enter_Token:        'Veuillez entrer le code d\'autorisation',
  GEN_Scan:               'Scanner un QR',
  OPEN_Paper_selected:    'Sauvegarde papier sélectionée.',
  GEN_Token_validation:   'Valider le code d\'autorisation',
  GEN_Token_validation_error: 'Merci de vérifier le code d\'autorisation, il est manquant ou incomplet.',
  GEN_Token_validation_KO: 'Le serveur n\'est pas disponible ou le code d\'autorisation que vous avez entré n\'est pas valable',
  GEN_Cancel:             'Annuler la création',
  GEN_pswd:               'Choisissez votre mot de passe <br/><small>(au moins 8 caractères, une lettre, un chifre et un caratère spécial)</small>',
  GEN_Placeholder_psw:    "Ne PAS oublier ce mot de passe !",
  GEN_Enrollment_KO:     'Le serveur n\'est pas disponible ou il a refusé la création de votre portefeuille.',
  GEN_Enrollment_Error:   'Une erreur est survenue lors de la création de votre portefeuille.',
  GEN_Warning_1:          'Attention! Si vous oubliez ce mot de passe, les montants contenus dans ce portefeuille seront perdus.',
  GEN_Create_1:           'Créer mon portefeuille',
  GEN_Result:             'Votre portefeuille a été créé.',
  GEN_Warning_2:          'Attention! Si vous perdez votre clé privée, les montants contenus dans ce portefeuille seront perdus.',  
  GEN_OK:                 'OK',
  GEN_ConfirmCreate:      'Conditions d\'utilisation',
  GEN_GenCondRead:        'J\'ai lu et j\'accepte les&nbsp;',
  GEN_GenCondLink:        'conditions d\'utilisation',
  GEN_LostPass:           'J\'ai bien compris que si je perds mon mot de passe ou mon fichier de backup, je ne serai plus en mesure d\'utiliser les montants liés à ce portefeuille',
  GEN_Create:             'Créer',



  /* Open Panel */
  OPEN_Choose_bak:        'Sélectionner une sauvegarde (fichier de portefeuille .dat)',
  OPEN_Choose_file:       'Choisir un fichier...',
  OPEN_Scan_back:         'Scan d\'une sauvegarde papier...',
  OPEN_Enter_psw:         'Votre fichier est chiffré, merci d\'entrer le mot de passe:',
  OPEN_Placeholder_psw:   'Mot de passe',
  OPEN_Access:            'Accéder à votre portefeuille:',
  OPEN_Open:              'Ouvrir le portefeuille',
  
  Acc_locked:             'Attention: ce compte est actuellement bloqué.',
  
  /* View Wallet*/
  VIEW_address:         'Votre compte',
  VIEW_QR:              'QR Code de votre portefeuille:',
  VIEW_Save_title:      'Sauvegarder votre portefeuille:',
  VIEW_Save:            'Fichier',
  VIEW_print:           'QR ',
  VIEW_print_adr:       'QR de votre adresse',
  VIEW_close_title:     'Verrouiller votre portefeuille:',
  VIEW_close:           'Verrouiller le portefeuille',
 
  VIEW_Delegation_Allowance:  'Procurations et Autorisations:',
  VIEW_Delegate_btn:    'Procurations',
  VIEW_Allowance_btn:   'Autorisations',
  WIEW_WrongPass:       'Mot de passe erroné!',
  
  /* Decrypt */
  DCRY_Enter_psw:       'Portefeuille verrouillé. Entrez votre mot de passe:',
  DCRY_Placeholder_psw: 'Mot de passe',
  DCRY_OK:              'OK',
  DCRY_Close_title:     'Fermer le portefeuille pour en changer:',
  DCRY_Close_btn:       'Changer de portefeuille',
  DCRY_Close_Wrn:       'Attention: Si vous fermez un portefeuille sans avoir enregistré une copie de sauvegarde, il sera perdu (ainsi que les montants qu\'il contient)',
  DCRY_Close_conf:      'J\'ai une sauvegarde.<br/> Je veux fermer ce portefeuille.',
  DCRY_Close_cancel:    'Garder ce portefeuille ouvert.',
  
  /*Transaction*/
  TRAN_Address:         'Votre compte',
  TRAN_Solde:           'Solde:',
  TRAN_Dest:            'Destinataire:',
  TRAN_Amount:          'Montant:',
  TRAN_Send:            'PAYER',
  TRAN_Confirm_text:    'Vous êtes en train d\'envoyer',
  TRAN_To:              'à',
  TRAN_Cancel:          'Annuler',
  TRAN_Confirm:         'Envoyer',
  TRAN_Scan:            'Scannez le QR Code',
  TRAN_ScanStart:       'Débuter le Scan',
  TRAN_OK:              'OK',
  TRAN_Enter_pass:      'Veuillez entrer votre mot de passe et confirmer le paiement',
  
  TRAN_Request:              'Facturer',
  TRAN_Confirm_text_request: 'Vous êtes en train de demander le paiement de',
  TRAN_From:                 'à',
  TRAN_Enter_pass_request:   'Veuillez entrer votre mot de passe et confirmer la demande',
  TRAN_executed_request_text:'Vous avez transmis la demande de paiement',
  
  TRAN_Done:            'La transaction a été transmise et est en traitement',
  TRAN_Wait:            '(...)',
  TRAN_Ongoing:         'Transaction en cours de traitement -',
  TRAN_WrongPass:       'Mot de passe erroné!',
  TRAN_executed_text:   'Vous avez transmis l\'ordre de payer',
  TRAN_rejected_request_text:   'Vous avez refusé de payer',
  TRAN_tans_id:         'Identifiant de la transaction:',
  TRAN_NotPossible:     'Avoir insuffisant pour la transaction',
  TRAN_SplitedTrans:    'Le paiement sera passé en plusieurs transactions',
  
  TRAN_Origine:          'Origine:',
  TRAN_choose_origine_btn:'Modifier',
  
  TRAN_Choose_Origine:'Faire un paiement depuis:',
  TRAN_MyAccount:'Ce compte',
  TRAN_MyDelegations:'Un autre compte',
  DELEG_pick:'Procurations',
  DELEG_Lim:'Limite: ',
  DELEG_delete:'&#x2718;',
  TRAN_Choose:'Choisir',
  TRAN_AskFrom:'Demander un versement à:',
  TRAN_PAY_ASKED: 'Demandes de paiement:',
  
  
  CTC_export_mem:'&#x21B3;',
  TRA_Export_title:'Exporter les transactions:',
  TRA_Export_date:'Date des transactions entre le',
  TRA_Export_date_to:' et le ',
  CTC_Export:'Exporter',
  CVS_COL_id:'ID',
  CVS_COL_date:'Date',
  CVS_COL_from:'De',
  CVS_COL_to:'A',
  CVS_COL_amount:'Montant reçu',
  CVS_COL_amount_send:'Montant envoyé',
  CVS_COL_curr:'Monnaie',
  CVS_COL_memo:'Mémo.',
  CVS_COL_tax:'Taxe',
  CVS_COL_tr_id:'Transaction ID',
  

  OPT_title:'Options:',
  OPT_record_password:'Se souvenir du mot de passe:',
  OPT_zero:'jamais',
  OPT_two_min:'2 min.',
  OPT_five_min:'5 min.',
  OPT_15_min:'15 min.',
  OPT_hour:'une heure',
  OPT_warning:'Attention! Si vous sauvegardez le mot de passe, une personne ayant accès à l\'application peut effectuer des paiements sans connaître le mot de passe.',
  OPT_Enter_pass:'Veuillez entrer votre mot de passe et confirmer la modification',
  
  /* Exchange Office*/
  EXC_Wrong_Acc_Type:   'Le compte choisit n\'as pas accès à cette page',
  EXC_Account:          'Compte:',
  EXC_balances:         'Balance du compte:',
  EXC_Refresh:          'Actualiser',
  EXC_AccStat:          'Status du compte:',
  EXC_LockUnlock:       'Bloquer/ Activer le compte:',
  EXC_LockStatus:       'Le compte est actuellement ',
  EXC_Unlocked:         'actif',
  EXC_Locked:           'bloqué',
  EXC_UpdateLim:        'Mettre à jour',
  EXC_Credit_1:         'Créditer des&nbsp;',
  EXC_Credit_2:         '&nbsp;sur le compte:',                         
  EXC_Credit_prefix:    'Créditer ',
  EXC_CreditAccount:    'Créditer le compte',
  
  EXC_AccType:          'Type de compte:',
  EXC_Account_Type_physical:  'Personne',
  EXC_Account_Type_legal:     'Entreprise',
  EXC_Account_Type_admin:     'Administrateur',
  EXC_Update:           'Modifier le compte',
  EXC_New_type_not_compatible_with_bal: 'La balance n\'est pas compatible avec un compte de type  un type Personne.',
  EXC_lim_not_compatible_with_bal: 'La balance n\'est pas compatible avec Les nouvelles limites.',
  EXC_Account_updated:  'L\'ordre de modification du compte à été transmis.',
  
  EXC_ConfirmCreditAccountTitle:    'Confirmer le crédit sur le compte',   
  EXC_CreditAmount:         'Vous créditez le compte de ',
  EXC_Account_credited_with:         'Vous avez transmis un ordre de crédit sur ce compte de ',
  
  EXC_cancel:           'Annuler',
  EXC_confirm:          'Confirmer',
  
  GLB_Not_owner:        'Seul le compte détenteur du contrat a accès à cette page',
  
  GLB_Taxes:            'Taxes sur les transactions:',
  GLB_tax_amount:       'Montant de la taxe vers un compte privé',
  GLB_tax_amount_leg:   'Montant de la taxe vers un compte d\'entreprise',
  GLB_percent:          '&nbsp;pour 10000',
  GLB_update_tax:       'Modifier Taxe',
  GLB_Change_tax:       'Modifier la taxe vers un compte privé:',
  GLB_NewTaxAmount:     'Nouveau taux de la taxe sur les transactions:',
  
  GLB_Change_tax_leg:       'Modifier la taxe vers un compte d\'entreprise:',
  
  GLB_cancel:           'Annuler',
  GLB_confirm:          'Confirmer',
  GLB_Tax_amount_not_updated: 'Erreur: l\'ordre n\'a pu être transmis.',
  GLB_Tax_amount_updated: 'L\'ordre de modification du taux de la taxe a été transmis.',
  
  GLB_tax_account:      'Récipiendaire des taxes',
  GLB_update_tax_acc:   'Changer Compte',
  GLB_Change_tax_Account: 'Nouveau récipiendaire des taxes:',
  GLB_Tax_account_not_updated: 'Erreur: l\'ordre n\'a pu être transmis.',
  GLB_Tax_account_updated: 'L\'ordre de modification du récipiendaire de la taxe a été transmis.',
  
  GLB_Ownership:        'Détenteur du contrat:',
  GLB_update_Own_acc:   'Modifier Détenteur',
  GLB_Change_owner_Account: 'Nouveau détenteur du contrat:',
  GLB_Owner_account_not_updated: 'Erreur: l\'ordre n\'a pu être transmis.',
  GLB_Owner_account_updated: 'L\'ordre de modification du détenteur du contrat a été transmis.',
  
  EXC_unknow_address:   'Adresse de compte invalide ou inconnue.',
  
  /* Balance */

  BAL_balances:         'Répartition:',
 
  BAL_flem:             'Fond du Léman:      ',
  
  LIM_limites:          'Limites ',
  LIM_credit:           'Limite en positif:',
  LIM_debit:            'Limite en négatif:',
  
  /*  Delegation */
  DELEG_Delegate_Tab_Title:'Vos procurations:',
  DELEG_CloseTab:          'Fermer',
  DELEG_help:              '?',
  DELEG_add:               '&#x271A;',
  DELEG_noDeleg:           'Il n\'y a pas de procuration active.',
  DELEG_next:              '>',
  DELEG_prev:              '<',
  DELEG_NoMore:           'Il n\'y a pas d\'autre procuration.',
  
  
  DELEG_Delegate_Help_title:'A propos des procurations:',
  DELEG_Delegate_Help_text:'Une procuration donne l\'autorisation à un tiers d\'effectuer des paiements en votre nom vers un autre compte. La limite d\'une procuration est la somme maximum qui peut être engagée par transaction.',
  DELEG_Close:'Fermer',
  
  DELEG_Add_Deleg:'Ajouter une procuration',
  DELEG_chooseAddress:'Choisir l\'adresse:',
  DELEG_set_Limit:'Choisir la limite:',
  DELEG_Enter_pass:'Entrez votre mot de passe:',
  DELEG_cancel_Deleg:'Annuler',
  DELEG_Save_Deleg:'Sauver',
  DELEG_NotAcceptedAddress:'L\'adresse choisie n\'est pas valable pour une procuration.',
  DELEG_InvalidDelegationLimit:'La limite de la procuration n\'est pas valide.',
  DELEG_LimitAvailable: 'Limite: ',
  DELEG_AmountBiggerThanDeleg:'Montant suppérieur à la limite.',
  
  Deleg_order_create_send:'L\'ordre de création de la procuration à été envoyé.',
  Deleg_order_edit_send:'L\'ordre de modification de la procuration à été envoyé.',
  Deleg_order_delete_send:'L\'ordre de suppression de la procuration à été envoyé.',
  
  
  DELEG_Edit_Deleg:'Modifier la procuration',
  DELEG_Address:'Pour l\'adresse:',
  
  DELEG_Delete_Deleg:'Supprimer la procuration',
  DELEG_Delete_cancel_Deleg:'Conserver',
  DELEG_Delete_conf_Deleg:'Supprimer',
  DELEG_Delete_conf_Deleg:'Supprimer',
  
   /*  Allowance */
  ALLOW_Allowance_Tab_Title:'Vos autorisations de débit:',
  ALLOW_CloseTab:          'Fermer',
  ALLOW_help:              '?',
  ALLOW_add:               '&#x271A;',
  ALLOW_noAllow:           'Il n\'y a pas d\'autorisation de débit active.',
  
  ALLOW_Allowance_Help_title:'A propos des autorisations de débit:',
  ALLOW_Allowance_Help_text:'Une autorisation de débit (débit direct) donne le droit à la personne autorisée de prélever une somme sur votre compte à hauteur du montant que vous avez spécifié. Au-delà de cette limite, vous recevrez une demande de confirmation du paiement demandé.',
  ALLOW_Close:'Fermer',
  ALLOW_Add_Allow:'Ajouter une autorisation de débit',
  ALLOW_chooseAddress:'Choisir l\'adresse:',
  ALLOW_set_Amount:'Choisir le montant:',
  ALLOW_Enter_pass:'Entrez votre mot de passe:',
  ALLOW_cancel_Allowance:'Annuler',
  ALLOW_Save_Allowance:'Sauver',
  
  ALLOW_Edit_Allowance:'Modifier l\'autorisation de débit',
  ALLOW_Address:'Pour l\'adresse:',
  
  ALLOW_Delete_Allowance:'Supprimer l\'autorisation de débit',
  ALLOW_Delete_cancel_Allowance:'Conserver',
  ALLOW_Delete_conf_Allowance:'Supprimer',
  
  ALLOW_NotAcceptedAddress:'L\'adresse choisie n\'est pas valable pour une autorisation de débit.',
  ALLOW_InvalidDelegationLimit:'Le montant de l\'autorisation n\'est pas valide.',
  
  ALLOW_order_create_send:'L\'ordre de création de  l\'autorisation à été envoyé.',
  ALLOW_order_edit_send:'L\'ordre de modification de  l\'autorisation à été envoyé.',
  ALLOW_order_delete_send:'L\'ordre de suppression de  l\'autorisation à été envoyé.',
  
  Allow_NoMore:           'Il n\'y a pas d\'autre autorisation.',
  
  /* List des Transactions*/
  TRA_Transactions:      'Vos transactions:',
  TRA_Got:               'Reçu ',
  TRA_InDateOf:          ' en date du ',
  TRA_From:              ' de ',
  TRA_Paid:              'Versé ',
  TRA_To:                ' à ',
  TRA_Ammount:           'Montant/date',
  TRA_add:               '>',
  TRA_prev:              '<',
  TRA_next:              '>',
  TRA_NoTrans:           'Pas de transaction associée à ce compte.',
  TRA_NoMore:            'Pas d\'autre transactions.',
  TRA_Refresh:           '&#x21BA;',
  TRA_details_title:     'Détails de la transaction:',
  TRA_details_block:     'Faisant partie du block: ',
  TRA_details_date:      'Date d\'execution:',
  TRA_details_amount:    'Montant transféré:',
  TRA_Close:             'Fermer',
  TRA_memo:              'Mémo:',
  TRA_no_valid_memo:     'Ce fichier ne contien pas de mémo valide.',
  TRA_Import_title:      'Importer des mémos',
  TRA_SelectFile:        'Choisir un fichier',
  TRA_Import_FileNumber: ' Mémos dans le fichier',
  TRA_Import_localNumber:' Mémos locaux',
  TRA_Import_Conflict:   ' Mémos communs',
  TRA_Import_merge:      'Import des mémos communs: ',
  TRA_Merge_their:       'Remplacer par ceux du fichier',
  TRA_Merge_mine:        'Concerver les locaux ',
  TRA_handle_memo:       'Exporter les transactions ',
  TRA_Number:            'Nombre de tranbsaction par page:', 
  TRA_Date:              'Date',
  TRA_TranId:            'Identifiant',
  TRA_Memo:              'Mémo',
  TRA_Part:              'Partenaire',
  TRA_tot_column:        'Totaux:',
  
  TRA_ToApprove:         'A approuver',
  TRA_PendingRequest:    'Mes demandes',
  TRA_CloseTab:          'Fermer',
  
  TRA_pay:               'Payer',
  TRA_reject:            'Refuser',
  TRAN_reject_text:      'Vous êtes en train de refuser une demande de',
  TRAN_asked_by:         'formulée par',
  TRAN_Enter_pass_reject:'Veuillez entrer votre mot de passe et confirmer votre refus',
  TRAN_Keep:             'Annuler',
  TRAN_Reject:           'Refuser',
  
  TRA_Approval_Tab_Title: 'Demandes de paiement',
  TRA_NoMoreApproval:     'Pas d\'autre demande',
  TRA_Approval_Help_title:'A propos des demandes de paiement',
  TRA_Approval_Help_text: 'Cette page liste les demandes de paiement qui vous sont adressées et que vous n\'avez pas encore traitées.\n Une demande de paiement est générée: <br>1. soit lorsqu\'un utilisateur demande un versement de votre part vers son compte (facture), <br>2. soit en cas d’autorisation de votre part, lorsque le montant demandé dépasse celui de l\'autorisation. <br>Vous pouvez refuser la transaction: celle-ci disparaît alors de la liste. Si vous acceptez la demande, le paiement est effectué, le montant correspondant est débité de votre compte et la transaction apparaît (une fois traitée) dans la liste des transactions.',
  
  TRA_Pending_Tab_Title: 'Mes demandes de paiement',
  TRA_NoMorePending:     'Pas d\'autre demande',
  TRA_NoMoreAccepted:     'Pas d\'autre demande',
  TRA_NoMoreRejected:     'Pas d\'autre demande',
  TRA_Pending_Help_title:'A propos de mes demandes',
  TRA_Pending_Help_text: 'Cette page liste les demandes de paiement que vous avez adressées à des tiers. Vous y trouverez l\'état de vos demandes.',
  TRA_Accepted_dissmissed:'L\'ordre de cacher cette information a été envoyé.',
  TRA_Request_Rejected:   'L\'ordre de refuser la demande de paiement a été envoyé.',
  TRA_Request_Payed:      'Votre ordre de paiement a été envoyé.',

    
  /* Contacts */
  CTC_yourContacts:      'Vos contacts:',
  CTC_noContacts:        'Aucun contact. Pour faciliter le suivi de vos paiements, vous devez nommer vos contacts avec le bouton d\'ajout dans la page des contacts ou en cliquant sur l\'identifiant d\'une transaction.',
  CTC_edit:              '&#x270E;',
  CTC_editName:          'Modifier le nom du contact',
  CTC_editNameCancel:    'Annuler',
  CTC_editNameSave:      'Enregistrer',
  CTC_delete:            '&#x2718;',
  CTC_confirmDelete:     'Supprimer le contact',
  CTC_deleteCancel:      'Conserver',
  CTC_deleteConfirm:     'Supprimer',
  
  CTC_confirmAdd:        'Ajouter cette adresse à vos contacts',
  CTC_withName:          'Choisissez son nom:',
  CTC_addConfirm:        'Ajouter',
  CTC_AlreadyAdded:      'Cette adresse fait déjà partie de vos contacts',
  CTC_updateName:        'Voulez-vous modifier son nom?',
  CTC_addCancel:         'Annuler',
  CTC_updateConfirm:     'Enregistrer',
  
  
  CTC_add:               '&#x271A;',
  CTC_export:            '&#x21b1;',
  CTC_import:            '&#x21b4;',
  CTC_Import_title:      'Importer des contacts',
  CTC_SelectFile:        'Choisir un fichier',
  CTC_Import_file:       '',
  CTC_Import_FileNumber: ' Contacts dans le fichier',
  CTC_Import_localNumber:' Contacts locaux',
  CTC_Import_Conflict:   ' Contacts communs',
  CTC_Import_merge:      'Import des contacts communs: ',
  CTC_Merge_their:       'Remplacer par ceux du fichier',
  CTC_Merge_mine:        'Concerver les locaux ',
  
  CTC_Import_save:       'Importer',
  
  CTC_Tooltip_Export:	 'Exporter',
  CTC_Tooltip_Import:    'Importer',
  CTC_Tooltip_Ajout:     'Ajouter',
  CTC_Tooltip_Rafraichir:'Rafraichir',
 
  
  
  CTC_no_valid_ctc:       'Ce fichier ne contien pas de contact valide.',
  CTC_Add_ctc:           'Ajouter un contact',
  CTC_chooseAddress:     'Choisir une adresse:',
  CTC_chooseName:        'Choisir un nom pour le contact:',
  CTC_addNameCancel:     'Annuler',
  CTC_addNameSave:       'Enregistrer',
  
  CTC_pick:              'Contacts',
  CTC_pickContact:       'Choisir un contact',
  CTC_cancelChoose:      'Annuler',
  CTC_ConfirmChoose:     'Choisir',
  
  STR_yourWallets:       'Vos portefeuilles',
  STR_forget:            '&#x2718;',
  STR_editName:          'Assigner un nom au portefeuille',
  STR_WarningBrowser:    'Vous utilisez un Navigateur Web',
  STR_WarningQuestion:   'Attention: cet ordinateur est-il le vôtre?',
  STR_No:                'Non',
  STR_Yes:               'Oui',
  STR_logout:            'Pour votre sécurité, une fois votre session terminée veuillez: <br/><ol> <li>Verrouiller votre portefeuille et revenir sur cette page. </li> <li>  Vous assurer que vous avez un fichier de sauvegarde de votre portefeuille sur un autre support que le disque de cet ordinateur. </li> <li> Eliminer les copies du fichier de sauvegarde de cet ordinateur (Si vous avez sauvegardé votre portefeuille au cours de cette session, vérifiez le dossier "Téléchargement"). </li> <li> Supprimer votre portefeuille de la liste ci-dessous</li> <li> Vider le cache du navigateur.</li></ol>',
  STR_NoWallet:          'Pas de portefeuille',
  STR_confirmDelete:     'Supprimer cle portefeuille de la mémoir',
  STR_warning:           'Attention vous devez conserver un fichier de sauvegarde pour pouvoir réouvrir votre portefeuille. Ci ce n\'est pas déjà fait vous pouvez faire une sauvegarde ci-dessous',
  STR_Backup:            'Faire une sauvegarde du portefeuille',
  STR_forgetConfirm:     'Supprimer',
  
  STR_Lock_wallet_title: 'Verrouiller votre portefeuille',
  STR_Lock_wallet:       'Verrouiller',
  STR_Switch_title: 'Ouvrir un autre portefeuille',
  STR_LockCancel:        'Annuler',
  /********************************************************/
  /* General */
  x_Wallet:             'Portefeuille',
  x_Password:           'Mot de passe',
  x_Download:           'Télécharger',
  x_Address:            'Votre compte',
  x_Save:               'Sauvegarder',
  x_Cancel:             'Annuler',
  x_AddessDesc:         'Aussi appelé "Numéro de compte" ou "Clé publique". C\'est ce que vous envoyez aux gens pour qu\'ils puissent vous envoyer des ether. Cette icône est une façon simple de reconnaitre votre adresse.',
  x_PrivKey:            'Clé privée (non-chiffrée)',
  x_PrivKey2:           'Clé privée',
  x_PrivKeyDesc:        'C\'est la version textuelle non-chiffrée de votre clé privée, ce qui signifie qu\'aucun mot de passe n\'est nécessaire pour l\'utiliser. Si quelqu\'un venait à découvrir cette clé privée, il pourrait accéder à votre portefeuille sans mot de passe. Pour cette raison, la version chiffrée de votre clé privée est recommandée.',
  x_Keystore:           'Fichier Keystore/JSON (Recommandé · Chiffré · Format Mist/Geth)',
  x_Keystore2:          'Fichier Keystore/JSON',
  x_KeystoreDesc:       'Ce fichier Keystore / JSON utilise le même format que celui que Mist & Geth, vous pouvez donc facilement l\'importer plus tard dans ces logiciels. C\'est le fichier que nous vous recommandons de télécharger et sauvegarder.',
  x_Json:               'Fichier JSON (non-chiffré)',
  x_JsonDesc:           'C\'est la version non-chiffrée au format JSON de votre clé privée. Cela signifie que vous n\'avez pas besoin de votre mot de passe pour l\'utiliser, mais que toute personne qui trouve ce JSON peut accéder à votre portefeuille et vos Ether sans mot de passe.',
  x_PrintShort:         'Imprimer',
  x_Print:              'Imprimer un portefeuille papier',
  x_PrintDesc:          'Astuce: Cliquez sur Imprimer et sauvegardez le portefeuille papier comme un PDF, même si vous n\'avez pas d\'imprimante !',
  x_CSV:                'Fichier CSV (non-chiffré)',
  x_TXT:                'Fichier TXT (non-chiffré)',

  /* Header */
  MEW_Warning_1:        'Vérifiez toujours l\'URL avant d\'accéder à votre portefeuille ou de générer un nouveau portefeuille. Attentions aux sites de phishing !',
  CX_Warning_1:         'Assurez vous d\'avoir une **sauvegarde externe** de tout portefeuille que vous gérez ici. De nombreux événements peuvent vous faire perdre les données de cette extension Chrome, y compris la désinstallation et la réinstallation de l\'extension. Cette extension est une manière d\'accéder facilement à vos portefeuilles, **pas** une façon de les sauvegarder.',
  MEW_Tagline:          'Portefeuille d\'Ether Open Source JavaScript côté client',
  CX_Tagline:           'Extension Chrome de portefeuille d\'Ether Open Source JavaScript côté client',

  /* Footer */
  FOOTER_1:             'Un outil open source en Javascript s\'exécutant côté client pour générer des portefeuilles Ethereum et envoyer des transactions.',
  FOOTER_1b:            'Créé par',
  FOOTER_2:             'Donations extrêmement appréciées:',
  FOOTER_3:             'Génération de portefeuille côté client par',
  FOOTER_4:             'Avertissement',

  /* Sidebar */
  sidebar_AccountInfo:  'Informations du compte: ',
  sidebar_AccountAddr:  'Addresse du compte: ',
  sidebar_AccountBal:   'Solde du compte: ',
  sidebar_TokenBal:     'Solde en tokens: ',
  sidebar_Equiv:        'Valeur correspondante: ',
  sidebar_TransHistory: 'Historique des transactions: ',
  sidebar_DGDBal:       'Informations sur la *crowdsale* DGD:',
  sidebar_donation:     'MyEtherWallet est un service gratuit et open source respectueux de votre vie privée et de votre sécurité. Plus nous recevons de donations, plus nous dédions du temps à développer de nouvelles fonctions, à écouter vos retours et à vous fournir ce dont vous avez besoin. Nous ne sommes que deux personnes qui essayent de changer le monde. Aidez-nous !',
  sidebar_donate:       'Faire une donation',
  sidebar_thanks:       'MERCI !!!',

  /* Decrypt Panel */
  decrypt_Access:         'Comment voulez-vous accéder à votre portefeuille ?',
  decrypt_Title:          'Choisissez le format de votre clé privée',
  decrypt_Select:         'Choisissez un portefeuille:',

  /* Add Wallet */
  ADD_Label_1:            'Que voulez-vous faire ?',
  ADD_Radio_1:            'Générer un nouveau portefeuille',
  ADD_Radio_2:            'Choisissez le fichier de votre portefeuille (Keystore / JSON)',
  ADD_Radio_2_alt:        'Choisissez le fichier de portefeuille: ',
  ADD_Radio_2_short:      'CHOISISSEZ LE FICHIER DU PORTEFEUILLE...',
  ADD_Radio_3:            'Collez/saisissez votre clé privée',
  ADD_Radio_4:            'Ajoutez un compte',
  ADD_Label_2:            'Nommez votre compte:',
  ADD_Label_3:            'Votre fichier est chiffré, merci de saisir le mot de passe: ',
  ADD_Label_4:            'Ajouter un compte à afficher',
  ADD_Warning_1:          'Vous pouvez ajouter n\'importe quel compte pour l\'afficher dans l\'onglet "portefeuilles" sans uploader une clé privée. Cela ne veut **pas** dire que vous aurez accès à ce portefeuille, ni que vous pouvez transférer des Ethers depuis ce portefeuille.',
  ADD_Label_5:            'Entrez l\'adresse: ',
  ADD_Label_6:            'Déverrouiller votre portefeuille',
  ADD_Label_6_short:      'Déverrouiller',
  ADD_Label_7:            'Ajouter un compte',

  /* Generate Wallets */
  GEN_desc:               'Si vous voulez générer plusieurs portefeuilles, vous pouvez le faire ici: ',
  GEN_Label_1:            'Entrez un mot de passe fort (au moins 8 caractères, une lettre, un chifre et un caratère spécial)',
  GEN_Placeholder_1:      'N\'oubliez PAS de sauvegarder ceci !',
  GEN_SuccessMsg:         'Succès ! Votre portefeuille a été généré.',
  GEN_Warning:            '**Vous avez besoin de votre fichier Keystore/JSON et du mot de passe ou de la clé privée** pour accéder à ce portefeuille dans le futur. Merci de le télécharger et d\'en faire une sauvegarde externe ! Il n\'existe aucun moyen de récupérer un portefeuille si vous ne le sauvegardez pas. Merci de lire la [page d\'Aide](https://www.myetherwallet.com/#help) pour plus de détails.',
  GEN_Label_2:            'Sauvegardez votre fichier Keystore/JSON ou votre clé privée. N\'oubliez pas votre mot de passe ci-dessus.',
  GEN_Label_3:            'Sauvegarder votre portefeuille.',
  GEN_Label_4:            'Imprimer votre portefeuille papier, ou conserver une version QR code. (optionnel)',

  /* Bulk Generate Wallets */
  BULK_Label_1:           'Nombre de portefeuilles à générer',
  BULK_Label_2:           'Générer les portefeuilles',
  BULK_SuccessMsg:        'Succès ! Vos portefeuilles ont été générés.',

  /* Sending Ether and Tokens */
  SEND_addr:             'Adresse de destination: ',
  SEND_amount:           'Montant à envoyer: ',
  SEND_amount_short:     'Montant',
  SEND_custom:           'Spécifique',
  SEND_gas:              'Gaz',
  SEND_TransferTotal:    'Envoi du solde total', // updated to be shorter
  SEND_generate:         'Générer la transaction',
  SEND_raw:              'Transaction brute',
  SEND_signed:           'Transaction signée',
  SEND_trans:            'Envoyer la transaction',
  SENDModal_Title:       'Attention ! ',
  /* full sentence reads "You are about to send "10 ETH" to address "0x1234". Are you sure you want to do this? " */
  SENDModal_Content_1:   'Vous êtes sur le point d\'envoyer',
  SENDModal_Content_2:   'à l\'adresse',
  SENDModal_Content_3:   'En êtes-vous sûr ?',
  SENDModal_Content_4:   'NOTE: Si vous rencontrez une erreur, il est très probable que vous deviez ajouter des ether à votre compte pour couvrir les coûts en gaz d\'envoi des tokens. Le gaz est payé en ether.',
  SENDModal_No:          'Non, je veux sortir d\'ici !',
  SENDModal_Yes:         'Oui, j\'en suis sûr ! Effectuer la transaction.',

  /* Tokens */
  TOKEN_Addr:            'Adresse: ',
  TOKEN_Symbol:          'Symbole du token: ',
  TOKEN_Dec:             'Décimales: ',

  /* Send Transaction */
  TRANS_desc:            'Si vous voulez envoyer des tokens, allez plutôt à la page "Envoi de tokens".',
  TRANS_warning:         'L\'emploi des fonctions "ETH seulement" et "ETC seulement" vous fait passer par un contrat. Certains services ont des problèmes avec ces transactions. En savoir plus.',
  TRANS_standard:        'ETH (transaction standard)',
  TRANS_eth:             'ETH seulement',
  TRANS_etc:             'ETC seulement',
  TRANS_advanced:        '+Avancé: Ajouter du gaz ou des données supplémentaires ',
  TRANS_data:            ' Données: ',
  TRANS_gas:             ' Gaz: ',
  TRANS_sendInfo:        'Une transaction standard utilisant 21000 gaz coûtera 0.000441 ETH. Le prix du gaz de 0.000000021 ETH que nous avons choisi est légèrement supérieur au minimum ain d\'assurer une confirmation rapide. Nous ne prenons pas de frais de transaction.',

  /* Send Transaction Modals */
  TRANSModal_Title:      'Transactions "ETH seulement" et "ETC seulement"',
  TRANSModal_Content_0:  'Note sur les transactions et services divers:',
  TRANSModal_Content_1:  '**ETH (Transaction standard): ** Génère une transaction par défaut directement depuis une adresse vers une autre. Son gaz par défaut est de 21000. Il est probable que toute transaction d\'ETH envoyé de cette manière sera réexécutée sur la chaîne ETC.',
  TRANSModal_Content_2:  '**ETH seulement: ** Envoie à travers le [contrat anti-réexécution de Timon Rapp (recommandé par VB)](https://blog.ethereum.org/2016/07/26/onward_from_the_hard_fork/) afin de n\'envoyer que sur la chaîne **ETH**.',
  TRANSModal_Content_3:  '**ETC seulement: ** Envoie à travers le [contrat anti-réexécution de Timon Rapp (recommandé par VB)](https://blog.ethereum.org/2016/07/26/onward_from_the_hard_fork/) afin de n\'envoyer que sur la chaîne **ETC**. ',
  TRANSModal_Content_4:  '**Coinbase & ShapeShift: ** N\'envoyer que par transaction standard. Si vous utilisez les contrats d\'envoi sur une seule chaîne, vous devrez joindre leur équipe de support pour ajouter manuellement la somme à votre solde ou pour vous rembourser. [Vous pouvez aussi essayer l\'outil "split" de Shapeshift.](https://split.shapeshift.io/)',
  TRANSModal_Content_5:  '**Kraken & Poloniex:** Pas de problème connu. Utilisez ce que vous voulez.',
  TRANSModal_Yes:        'Génial, j\'ai compris.',
  TRANSModal_No:         'Aïe, je comprends de moins en moins. Aidez-moi.',

  /* Offline Transaction */
  OFFLINE_Title:         'Génération et envoi d\'une transaction hors ligne',
  OFFLINE_Desc:          'La génération d\'une transaction hors ligne s\'effectue en trois étapes. Les étapes 1 et 3 sont réalisées sur un ordinateur en ligne et l\'étape 2 sur un ordinateur déconnecté du réseau. Cela permet d\'isoler totalement vos clefs privées de toute machine connectée à l\'internet.',
  OFFLINE_Step1_Title:   'Étape 1: Gérération de l\'information (ordinateur en ligne)',
  OFFLINE_Step1_Button:  'Générer l\'information',
  OFFLINE_Step1_Label_1: 'Addresse d\'émission: ',
  OFFLINE_Step1_Label_2: 'Note: Il s\'agit de l\'adresse de départ, pas de l\'adresse d\'arrivée. Le nonce est généré à partir du compte de l\'expéditeur. Si on utilise une machine déconnectée du réseau, cette adresse est celle du compte en _cold storage_.',
  OFFLINE_Step2_Title:   'Étape 2: Génération de la transaction (ordinateur hors ligne)',
  OFFLINE_Step2_Label_1:  'Adresse de destination: ',
  OFFLINE_Step2_Label_2:  'Valeur / montant à envoyer',
  OFFLINE_Step2_Label_3:  'Prix du gaz ',
  OFFLINE_Step2_Label_3b: 'Ce montant était affiché à l\'étape 1 sur votre ordinateur en ligne.',
  OFFLINE_Step2_Label_4:  'Limite de gaz ',
  OFFLINE_Step2_Label_4b: '21000 est la limite par défaut. En cas d\'envoi vers des contrats ou avec des données supplémentaires, cette valeur peut être différente. Tout gaz non consommé vous sera renvoyé.',
  OFFLINE_Step2_Label_5:  'Nonce',
  OFFLINE_Step2_Label_5b: 'Cette valeur a été affichée à l\'étape 1 sur votre ordinateur en ligne.',
  OFFLINE_Step2_Label_6:  'Données',
  OFFLINE_Step2_Label_6b: 'Cette zone est optionnelle. Les données sont souvent utilisées lors de transactions vers des contrats.',
  OFFLINE_Step2_Label_7:  'Entrez / sélectionnez votre clef privée / JSON.',
  OFFLINE_Step3_Title:    'Étape 3: Envoyer / publier la transaction (ordinateur en ligne)',
  OFFLINE_Step3_Label_1:  'Copier ici la transaction signée à l\'étape 2 et cliquez sur le bouton "ENVOYER LA TRANSACTION".',

  /* DAO */
  DAO_bal1:               'au bloc 1.919.999',
  DAO_bal2:               'actuel',
  DAO_TitleETH:           'Retrait de DAO en ETH',
  DAO_TitleETC:           'Retrait de DAO en ETC',
  DAO_ETC_Label_1:        'À quelle adresse voulez-vous que les ETC soient envoyés ?',
  DAO_ETC_Label_2:        'Le "White Hat Group" a travaillé sans relâche pour vous rendre vos ETC. Vous pouvez les remercier par une donation d\'un pourcentage de votre retrait si vous le souhaitez. ',
  DAO_Desc:               'Utilisez cet onglet pour retirer et convertir vos tokens en ETH. Si vous désirez envoyer des tokens DAO, utilisez l\'onglet Envoi de tokens.',
  DAO_Inst:               'Oui. Cliquez simplement sur le gros bouton rouge. Vous voyez, c\'est simple.',
  DAO_Warning:            'Si vous obtenez une erreur "Montant insuffisant pour le paiement du gaz", vous devez disposer d\'un petit montant en ether sur votre compte pour couvrir le coût en gaz. Ajoutez 0,001 ether sur votre compte et réessayez. ',
  DAOModal_Title:         'Juste pour être sûr...',
  // full sentence is "You are about to withdraw 100 DAO tokens to address 0x12344 for 1 ETH.
  DAOModal_1:             'Vous êtes sur le point de retirer',
  DAOModal_2:             'tokens DAO vers',
  DAOModal_3:             'pour', // "in return for"

  /* Digix */
  DGD_Desc:               'Réclamez vos tokens et vos badges DigixDAO (DGD). Pour ce faire, vous devez avoir participé à la vente de tokens du 30 et 31 mars 2016. Si vous désirez envoyez des DGD, utilisez l\'onglet Envoi de tokens.',
  DGD_Label_1:            'Estimation des frais consommés:',
  DGD_Label_2:            'Frais maximum fournis:',
  DGD_Label_3:            'Prix du gaz:',
  DGD_Generate:           'Générer une réclamation',
  DGD_Content:            'Vous allez réclamer vos tokens DGD.',

  /* Deploy Contracts */
  DEP_generate:        'Générer le bytecode',
  DEP_generated:       'Bytecode généré',
  DEP_signtx:          'Signer la transaction',
  DEP_interface:       'Interface générée',

  /* My Wallet */
  MYWAL_Nick:             'Nom du portefeuille',
  MYWAL_Address:          'Adresse du portefeuille',
  MYWAL_Bal:              'Solde',
  MYWAL_Edit:             'Modifier',
  MYWAL_View:             'Voir',
  MYWAL_Remove:           'Supprimer',
  MYWAL_RemoveWal:        'Supprimer le portefeuille:',
  MYWAL_WatchOnly:        'Vos comptes en affichage uniquement',
  MYWAL_Viewing:          'Affichage des portefeuilles: ',
  MYWAL_Hide:             'Cacher les informations sur le portefeuille',
  MYWAL_Edit_2:           'Modifier le portefeuille: ',
  MYWAL_Name:             'Nom du portefeuille',
  MYWAL_Content_1:        'Attention ! Vous êtes sur le point de supprimer votre portefeuille: ',
  MYWAL_Content_2:        'Assurez-vous d\'avoir bien **sauvegardé la clé privée/ fichier JSON et le mot de passe** associé à ce portefeuille avant de le supprimer.',
  MYWAL_Content_3:        'Si vous voulez utiliser ce portefeuille avec MyEtherWallet CX à l\'avenir, vous devrez le rajouter manuellement en utilisant la clé privée/fichier JSON et le mot de passe.',

  /* View Wallet Details */
  VIEWWALLET_Subtitle:      'Ceci vous permet de télécharger plusieurs versions des clefs privées et de réimprimer votre portefeuille papier. Vous devrez le faire pour [importer votre compte dans Geth/Mist](http://ethereum.stackexchange.com/questions/465/how-to-import-a-plain-private-key-into-geth/). Si vous voulez consulter votre solde, nous recommandons d\'utiliser un explorateur de blockchain comme [etherscan.io](http://etherscan.io/).',
  VIEWWALLET_Subtitle_Short: 'Ceci vous permet de télécharger plusieurs versions des clefs privées et de réimprimer votre portefeuille papier. ',
  VIEWWALLET_SuccessMsg:     'Succès ! Voici les détails de votre portefeuille.',

  /* Chrome Extension */
  CX_error_1:           'Vous n\'avez pas de portefeuille sauvegardé. Cliquez sur ["Ajout de portefeuille"](/cx-wallet.html#add-wallet) pour en ajouter un !',
  CX_quicksend:         'Envoi rapide', // if no appropriate translation, just use "Send"

  /* Error Messages */
  ERROR_1:              'Veuillez entrer un montant valide.',
  ERROR_2:              'Votre mot de passe doit faire au moins 8 caractères. Il doit contenir au minimum une lettre un chifre et un caractère spécial',
  ERROR_3:              'Désolé ! Notre service ne permet pas de gérer ce type de fichier de portefeuille. ',
  ERROR_4:              'Ceci n\'est pas un fichier de portefeuille. ',
  ERROR_5:              'Cette unité n\'existe pas, merci d\'utiliser une des unités suivantes ',
  ERROR_6:              'Adresse invalide. ',
  ERROR_7:              'Mot de passe invalide. ',
  ERROR_8:              'Montant invalide. ',
  ERROR_9:              'Limite de gaz invalide. ',
  ERROR_10:             'Valeur des données invalide. ',
  ERROR_11:             'Montant de gaz invalide. ',
  ERROR_12:             'Nonce invalide. ',
  ERROR_13:             'Transaction signée invalide. ',
  ERROR_14:             'Un portefeuille avec ce nom existe déjà. ',
  ERROR_15:             'Portefeuille non trouvé. ',
  ERROR_16:             'Il semble qu\'aucune proposition n\'existe encore avec cet identifiant ou qu\'il y a une erreur lors de la consultation de cette proposition. ',
  ERROR_17:             'Un portefeuille avec cette adresse existe déjà. Merci de consulter la page listant vos portefeuilles. ',
  ERROR_18:             'Il vous faut au moins 0.001 ether sur votre compte pour couvrir les coûts du gaz. Ajoutez des ether et réessayez. ',
  ERROR_19:             'Tout le gaz serait consommé lors de cette transaction. Cela signifie que vous avez déjà voté pour cette proposition ou que la période du débat est terminée.',
  ERROR_20:             'Symbole invalide',
  SUCCESS_1:            'Adresse valide',
  SUCCESS_2:            'Portefeuille déchiffré avec succès',
  SUCCESS_3:            'Transaction envoyée. Identifiant de transaction: ',
  SUCCESS_4:            'Votre portefeuille a été ajouté avec succès: ',
  SUCCESS_5:            'Vous avez voté avec succès. Merci d\'être un participant actif à The DAO.',
  SUCCESS_6:            'Fichier sélectionné: ',

  /* Geth Error Messages */
  GETH_InvalidSender:      'Expéditeur invalide',
  GETH_Nonce:              'Nonce trop bas',
  GETH_Cheap:              'Prix du gaz trop bas pour être accepté',
  GETH_Balance:            'Solde insuffisant',
  GETH_NonExistentAccount: 'Compte inexistant ou solde du compte trop bas',
  GETH_InsufficientFunds:  'Fonds insuffisants pour gaz * prix + valeur',
  GETH_IntrinsicGas:       'Gaz intrinsèque trop bas',
  GETH_GasLimit:           'Limite en gaz dépassée',
  GETH_NegativeValue:      'Valeur négative',

};

module.exports = fr;

