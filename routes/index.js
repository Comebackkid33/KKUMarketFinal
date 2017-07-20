var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {

    var fs = require('fs');
    var Cities = JSON.parse(cityJson);
    res.render('index',{title:"ККУ",Cities: Cities});
});


var cityJson = [
    {
        "City": "Самовывоз",
        "Price1": 0,
        "Price2": 0},
    {
        "City": "г.Ковров по городу",
        "Price1": 2130,
        "Price2": 3190},
    {
        "City": "Бабенки",
        "Price1": 1810,
        "Price2": 2660},
    {
        "City": "Близнино",
        "Price1": 3190,
        "Price2": 4780},
    {
        "City": "Брызгалово",
        "Price1": 2870,
        "Price2": 3720},
    {
        "City": "Великово",
        "Price1": 2130,
        "Price2": 3190},
    {
        "City": "Владимир город",
        "Price1": 6910,
        "Price2": 9560},
    {
        "City": "Восход",
        "Price1": 3190,
        "Price2": 4780},
    {
        "City": "Вязники город",
        "Price1": 6380,
        "Price2": 8500},
    {
        "City": "Гигант",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Глебово",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Говядиха",
        "Price1": 2130,
        "Price2": 3190},
    {
        "City": "Голышево",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Гороженово",
        "Price1": 2130,
        "Price2": 3190},
    {
        "City": "Гостюхино",
        "Price1": 2130,
        "Price2": 3190},
    {
        "City": "Гридино",
        "Price1": 2130,
        "Price2": 3190},
    {
        "City": "Достижение",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Дроздовка",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Душкино",
        "Price1": 3720,
        "Price2": 5310},
    {
        "City": "Заря",
        "Price1": 2130,
        "Price2": 3190},
    {
        "City": "Игумново",
        "Price1": 2130,
        "Price2": 3190},
    {
        "City": "Ильино",
        "Price1": 3190,
        "Price2": 4780},
    {
        "City": "Камешково город",
        "Price1": 3720,
        "Price2": 5310},
    {
        "City": "Клязьминский городок",
        "Price1": 3190,
        "Price2": 4780},
    {
        "City": "Княгинино",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Красный Маяк",
        "Price1": 3190,
        "Price2": 4780},
    {
        "City": "Красный Октябрь",
        "Price1": 3190,
        "Price2": 4780},
    {
        "City": "Крестниково",
        "Price1": 3190,
        "Price2": 4780},
    {
        "City": "Крутово",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Кузнечиха",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Кусакино",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Малыгино (Малышево)",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Маринино",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Марьино",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Медынцево",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Мелехово",
        "Price1": 1600,
        "Price2": 2660},
    {
        "City": "Мстера",
        "Price1": 3720,
        "Price2": 5310},
    {
        "City": "Нерехта",
        "Price1": 2130,
        "Price2": 3720},
    {
        "City": "Новинки",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Новый",
        "Price1": 2130,
        "Price2": 3720},
    {
        "City": "Новки",
        "Price1": 3190,
        "Price2": 4780},
    {
        "City": "Павловское",
        "Price1": 2130,
        "Price2": 3720},
    {
        "City": "Пантелеево",
        "Price1": 3720,
        "Price2": 5310},
    {
        "City": "Пакино",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Первомайский п. (птичник)",
        "Price1": 1600,
        "Price2": 2660},
    {
        "City": "Погост",
        "Price1": 2130,
        "Price2": 3720},
    {
        "City": "Приволье",
        "Price1": 3190,
        "Price2": 5310},
    {
        "City": "Ручей",
        "Price1": 2130,
        "Price2": 3720},
    {
        "City": "Санниково",
        "Price1": 3720,
        "Price2": 5310},
    {
        "City": "Сан.им.Абельмана",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Сенино",
        "Price1": 2130,
        "Price2": 3720},
    {
        "City": "Сенинские Дворики",
        "Price1": 2130,
        "Price2": 3720},
    {
        "City": "Смолино",
        "Price1": 3190,
        "Price2": 4780},
    {
        "City": "Старая деревня",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Степаново",
        "Price1": 2660,
        "Price2": 2450},
    {
        "City": "Сувориха",
        "Price1": 3190,
        "Price2": 4780},
    {
        "City": "Суханиха",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Троицко-Никольское",
        "Price1": 2130,
        "Price2": 3720},
    {
        "City": "Уваровка",
        "Price1": 3190,
        "Price2": 4780},
    {
        "City": "Усолье",
        "Price1": 3190,
        "Price2": 4780},
    {
        "City": "Филино",
        "Price1": 3190,
        "Price2": 4780},
    {
        "City": "Чернево",
        "Price1": 1810,
        "Price2": 2660},
    {
        "City": "Черноситово",
        "Price1": 1600,
        "Price2": 2660},
    {
        "City": "Шевинская",
        "Price1": 3190,
        "Price2": 5310},
    {
        "City": "Шмелево",
        "Price1": 2870,
        "Price2": 4250},
    {
        "City": "Эсино (Иваново-Эсино)",
        "Price1": 2660,
        "Price2": 4250},
    {
        "City": "Юдиха",
        "Price1": 3720,
        "Price2": 5310},
    {
        "City": "Юрино",
        "Price1": 3720,
        "Price2": 5310},
    {
        "City": "Другое",
        "Price1": 0,
        "Price2": 0}
];
module.exports = router;
